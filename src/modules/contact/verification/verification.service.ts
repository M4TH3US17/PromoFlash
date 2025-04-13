import { HttpException, HttpStatus } from "@nestjs/common";
import { ConfirmCodeRequestDTO } from "./dto/request-confirm-code.dto";
import { ContactVerificationEntity } from "./verification.entity";
import { AccountStatus } from "@shared/enums/account-status.enum";
import { TokenType } from "./enums/token-type.enum";
import { capitalize } from "@shared/utils/global.utils";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PhoneEntity } from "../phone/phone.entity";
import { EmailEntity } from "../email/email.entity";

export class ContactVerificationService {

    constructor(
        // private readonly SMSService: TwilioSMSService,
        // // private readonly twilioWhatsappService: TwilioWhatsappService,
        // private readonly venomWhatsappService: VenomWhatsappService,

        @InjectRepository(ContactVerificationEntity)
        private readonly repository: Repository<ContactVerificationEntity>,
        // @InjectRepository(UserEntity)
        // private readonly userRepository: Repository<UserEntity>,
        @InjectRepository(PhoneEntity)
        private readonly phoneRepository: Repository<PhoneEntity>,
        @InjectRepository(EmailEntity)
        private readonly emailRepository: Repository<EmailEntity>,
    ) { }


    public async confirmCode(contactId: number, request: ConfirmCodeRequestDTO, requestingUsername: string) {
        const verification: ContactVerificationEntity = await this.repository.
            findOne({
                where: { id: contactId, contact_type: request.contactType },
                relations: ["user"]
            });

        // VERIFICAÇÕES DE PERMISSÕES
        if (!verification) // verifica se o token informado existe
            throw new HttpException(`Nenhuma verificação de contato cujo ID seja ${contactId} foi encontrada!`, HttpStatus.NOT_FOUND);

        if (verification.used_at) // verifica se o token informado já foi usado
            throw new HttpException(`Token de ${verification.contact_type} cujo ID é ${contactId} já foi utilizado!`, HttpStatus.UNAUTHORIZED);

        if (verification.expired_at < new Date()) // verifica se o token informado já expirou
            throw new HttpException(`Token de ${verification.contact_type} (ID: ${contactId}) expirado em ${verification.expired_at.toISOString()}`, HttpStatus.UNAUTHORIZED);

        const contactOwnerUsername: string = verification.user.username.toUpperCase();
        const isNotContactOwner: boolean = (requestingUsername.toUpperCase() !== contactOwnerUsername); // usuário q está enviando a requisição é o msm q gerou o token ?

        if (isNotContactOwner && (verification.token_type === TokenType.CONFIRMATION)) // se for token de confirmação, usuário só pode usar se ele próprio gerou
            throw new HttpException(`Você não possui permissões para alterar os dados de ${capitalize(contactOwnerUsername)}`, HttpStatus.FORBIDDEN);

        if (verification.token !== request.token) // token informado é o mesmo token que foi enviado para o usuário?
            throw new HttpException(`Token de verificação fornecido está incorreto!`, HttpStatus.BAD_REQUEST);

        if (verification.contact_type !== request.contactType) // o token gerado para o contato X é o mesmo que o do token gerado?
            throw new HttpException(`Nenhum token de verificação para ${request.contactType} está em aberto!`, HttpStatus.BAD_REQUEST);

        // ATUALIZAÇÕES DOS DADOS
        verification.used_at = new Date();
        verification.updatedAt = new Date();
        await this.repository.save(verification);

        // Se é um usuário pendente (pendente = criado recentemente), é pq precisa confirmar o token enviado para o email ou número de celular
        if (verification.user.accountStatus === AccountStatus.PENDING) {
            if (verification.token_type === TokenType.CONFIRMATION && verification.contact_type === "SMS") {
                const unconfirmedPhone: PhoneEntity = await this.phoneRepository.findOne({
                    where: {
                        confirmed: false,
                        id: verification.contactId
                    }
                });
                unconfirmedPhone.confirmed = true;
                this.phoneRepository.save(unconfirmedPhone);
            }

            if (verification.token_type === TokenType.CONFIRMATION && verification.contact_type === "EMAIL") {
                const unconfirmedEmail: EmailEntity = await this.emailRepository.findOne({
                    where: {
                        confirmed: false,
                        id: verification.contactId
                    }
                });
                unconfirmedEmail.confirmed = true;
                this.emailRepository.save(unconfirmedEmail);
            }
        };

        return null;
    };
}