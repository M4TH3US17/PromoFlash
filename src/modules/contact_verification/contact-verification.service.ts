import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { APIResponseDTO } from "@shared/bases/usecase-response.dto";
import { ContactVerificationRequestDTO } from "./others/dto/request-contact-verification.dto";
import { ResponseContactVerificationDTO } from "./others/dto/response-contact-verification.dto";
import { ContactVerificationEntity } from "./contact-verification.entity";
import { EntityManager, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { ConfirmCodeRequestDTO } from "./others/dto/request-confirm-code.dto";
import { UserEntity } from "@modules/user/user.entity";
import { TokenType } from "./others/enums/token-type.enum";
import { capitalize } from "@shared/utils/global.utils";
import { EmailEntity, PhoneEntity } from "./contact_methods";
import { AccountStatus } from "@shared/enums/account-status.enum";
import { EstablishmentEntity } from "@modules/establishment/establishment.entity";
import { generateRandomCode, mapEmailRequestToEntity, mapPhoneRequestToEntity } from "./others";
import { OwnerType } from "./others/enums/owner-type.enum";
import { ContactType } from "./others/enums/contact-type.enum";
import { VenomWhatsappService } from "@infrastructure/external_services/venom/venom.service";

export class ContactVerificationService {

    constructor(
        // private readonly SMSService: TwilioSMSService,
        // private readonly twilioWhatsappService: TwilioWhatsappService,
        private readonly venomWhatsappService: VenomWhatsappService,

        @InjectRepository(ContactVerificationEntity)
        private readonly repository: Repository<ContactVerificationEntity>,
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
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

    // DEIXAR ESSA CRIAÇÃO DE TELEFONE E EMAIL MAIS FLEXÍVEL (ESTABELECIMENTO E USUÁRIO)
    public async createPhones(
        phones: PhoneEntity[],
        owner: UserEntity | EstablishmentEntity,
        transactional: EntityManager,
    ): Promise<ContactVerificationEntity[]> {
        if (!phones?.length) return;

        const phonesToProcess = phones.slice(0, 2);
        const verifications: ContactVerificationEntity[] = [];

        await Promise.all(phonesToProcess.map(async (phone: PhoneEntity) => {
            let verificationCode: number = generateRandomCode();
            let message: string = `[USUÁRIO] Olá, seu código de verificação PromoFlash é: ${verificationCode}`;
            let phoneCreated = null;

            let phoneAlreadyInUse = await this.phoneRepository.findOne({
                where: {
                    ddd: phone.ddd,
                    countryCode: phone.countryCode,
                    number: phone.number
                }
            });

            if (phoneAlreadyInUse) // tentativa de cadastro com um contato existente. Não criar um novo contato, apenas reutilizar.
                message = `[USUÁRIO] Olá, verificamos que houve uma tentativa de cadastro no nosso aplicativo PromoFlash utilizando seu contato. Se foi você, confirme no app este código: ${verificationCode}`;
            else
                phoneCreated = await transactional.save(PhoneEntity, mapPhoneRequestToEntity(phone));

            let verification = await transactional.save(ContactVerificationEntity, {
                used_at: null,
                user: owner,
                token: verificationCode,
                owner_type: OwnerType.USER,
                token_type: TokenType.CONFIRMATION,
                contact_type: ContactType.SMS,
                contactId: phoneAlreadyInUse ? phoneAlreadyInUse.id : phoneCreated.id,
                expired_at: new Date(Date.now() + 5 * 60 * 1000)
            });

            verifications.push(verification)
            await this.venomWhatsappService.sendMessage(`${phone.countryCode}${phone.ddd}${phone.number}`, `[MENSAGEM DE TESTE - SMS] Código de Verificação de telefone: (${verificationCode})`);
            // this.SMSService.sendSMS(formatPhoneNumberToSendSMS(phone), message);
        }
        ));

        return verifications
    };

    public async createEmails(
        emails: EmailEntity[],
        owner: UserEntity | EstablishmentEntity,
        transactional: EntityManager
    ): Promise<ContactVerificationEntity[]> {
        if (!emails?.length) return;

        const emailsToProcess = emails.slice(0, 2);
        const verifications: ContactVerificationEntity[] = [];

        await Promise.all(emailsToProcess.map(async (email: EmailEntity) => {
            let verificationCode: number = generateRandomCode();
            let message: string = `[USUÁRIO] Olá, seu código de verificação PromoFlash é: ${verificationCode}`;
            let emailCreated: EmailEntity = null;

            let emailAlreadyInUse = await this.emailRepository.findOne({ where: { email: email.email } });

            if (emailAlreadyInUse) // tentativa de cadastro com um contato existente. Não criar um novo contato, apenas reutilizar.
                message = `[USUÁRIO] Olá, verificamos que houve uma tentativa de cadastro no nosso aplicativo PromoFlash
                        utilizando seu email. Se foi você, confirme no app este código: ${verificationCode}`;
            else {
                emailCreated = await transactional.save(EmailEntity, mapEmailRequestToEntity(email));
            }

            let verification = await transactional.save(ContactVerificationEntity, {
                used_at: null,
                user: owner,
                token: verificationCode,
                owner_type: OwnerType.USER,
                token_type: TokenType.CONFIRMATION,
                contact_type: ContactType.EMAIL,
                contactId: emailAlreadyInUse ? emailAlreadyInUse.id : emailCreated.id,
                expired_at: new Date(Date.now() + 5 * 60 * 1000)// moment().add(5, 'minutes').toDate()
            });

            verifications.push(verification);
            await this.venomWhatsappService.sendMessage(`+5592986067356`, `[MENSAGEM DE TESTE - EMAIL] Código de Verificação de email: (${verificationCode}) ${emailAlreadyInUse ? JSON.stringify(emailAlreadyInUse.email) : email}`);
            // this.SMSService.sendSMS(formatPhoneNumberToSendSMS(phone), message);
        }));

        return verifications;

    };
};
        // await this.twilioWhatsappService.sendMessage(
        //     '+559286067356', 
        //     'Mensagem Recebida com sucesso ! (PromoFlash)'
        // );