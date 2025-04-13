import { Injectable } from "@nestjs/common";
import { PhoneEntity } from "./phone.entity";
import { UserEntity } from "@modules/user/user.entity";
import { EstablishmentEntity } from "@modules/establishment/establishment.entity";
import { EntityManager, Repository } from "typeorm";
import { generateRandomCode, mapPhoneRequestToEntity } from "../contact.utils";
import { TokenType } from "../verification/enums/token-type.enum";
import { OwnerType } from "../verification/enums/owner-type.enum";
import { ContactType } from "../verification/enums/contact-type.enum";
import { InjectRepository } from "@nestjs/typeorm";
import { VenomWhatsappService } from "@infrastructure/external_services/venom/venom.service";
import { EmailEntity } from "../email/email.entity";
import { ContactVerificationEntity } from "../verification/verification.entity";


@Injectable()
export class PhoneService {

    constructor(
        // private readonly SMSService: TwilioSMSService,
        // // private readonly twilioWhatsappService: TwilioWhatsappService,
        private readonly venomWhatsappService: VenomWhatsappService,

        @InjectRepository(ContactVerificationEntity)
        private readonly repository: Repository<ContactVerificationEntity>,
        // @InjectRepository(UserEntity)
        // private readonly userRepository: Repository<UserEntity>,
        @InjectRepository(PhoneEntity)
        private readonly phoneRepository: Repository<PhoneEntity>,
        @InjectRepository(EmailEntity)
        private readonly emailRepository: Repository<EmailEntity>,
    ) { }

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
}