import { Injectable } from "@nestjs/common";
import { PhoneEntity } from "./phone.entity";
import { UserEntity } from "@modules/user/user.entity";
import { EstablishmentEntity } from "@modules/establishment/establishment.entity";
import { EntityManager, Repository } from "typeorm";
import { generateRandomCode } from "../contact.utils";
import { TokenType } from "../verification/enums/token-type.enum";
import { OwnerType } from "../verification/enums/owner-type.enum";
import { ContactType } from "../verification/enums/contact-type.enum";
import { InjectRepository } from "@nestjs/typeorm";
import { VenomWhatsappService } from "@infrastructure/external_services/venom/venom.service";
import { ContactVerificationEntity } from "../verification/verification.entity";
import { mapPhoneRequestToEntity } from "./phone.utils";
import { SMSVerificationTemplate } from "src/assets/templates/whatsapp/venom/verification";
import { formatPhoneNumberToSendSMS } from "@infrastructure/external_services/twilio/sms/sms.utils";
import { TwilioSMSService } from "@infrastructure/external_services/twilio/sms/sms.service";


@Injectable()
export class PhoneService {

    constructor(
        private readonly SMSService: TwilioSMSService,
        private readonly venomWhatsappService: VenomWhatsappService,

        @InjectRepository(PhoneEntity)
        private readonly phoneRepository: Repository<PhoneEntity>,
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
            let phoneCreated = null;

            let phoneAlreadyInUse = await this.phoneRepository.findOne({
                where: {
                    ddd: phone.ddd,
                    countryCode: phone.countryCode,
                    number: phone.number
                }
            });

            if (!phoneAlreadyInUse)
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

            let message = SMSVerificationTemplate(
                String(verificationCode),
                "PromoFlash",
                true,
                phone,
            );

            console.log(message)
            // await this.venomWhatsappService.sendMessage(`${phone.countryCode}${phone.ddd}${phone.number}`, message);
            // this.SMSService.sendSMS(formatPhoneNumberToSendSMS(phone), `Código de verificação: ${verificationCode}`);
        }
        ));

        return verifications
    };
}