import { InjectRepository } from "@nestjs/typeorm";
import { ContactVerificationEntity } from "../verification/verification.entity";
import { EntityManager, Repository } from "typeorm";
import { EmailEntity } from "./email.entity";
import { UserEntity } from "@modules/user/user.entity";
import { EstablishmentEntity } from "@modules/establishment/establishment.entity";
import { generateRandomCode } from "../contact.utils";
import { TokenType } from "../verification/enums/token-type.enum";
import { OwnerType } from "../verification/enums/owner-type.enum";
import { ContactType } from "../verification/enums/contact-type.enum";
import { VenomWhatsappService } from "@infrastructure/external_services/venom/venom.service";
import { mapEmailRequestToEntity } from "./email.utils";

export class EmailService {

    constructor(
        private readonly venomWhatsappService: VenomWhatsappService,

        @InjectRepository(EmailEntity)
        private readonly emailRepository: Repository<EmailEntity>,
    ) { }

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
}