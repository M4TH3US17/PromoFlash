import { ContactVerificationEntity } from "@modules/contact_verification/contact-verification.entity";
import { EmailMethod, PhoneMethod } from "@modules/contact_verification/contact_methods";
import { OmitType, PartialType, PickType } from "@nestjs/swagger";

export class CreatePhoneContactDTO extends PickType(
    OmitType(PhoneMethod, 
        [
        'codeVerification', 
        'codeExpiration', 
        'isValid', 
        "deletedAt",
        "updatedAt",
        "createdAt",
        "establishmentEmail",
        "establishmentSecondPhone",
        "establishmentfirstPhone",
        "userEmail",
        "userPhone"
    ]),
    ['countryCode', 'ddd', 'number'],
) {
    getFullPhoneNumber(): string {
        return `${this.countryCode} (${this.ddd}) ${this.number}`
    };
};

export class CreateEmailContactDTO extends PickType(
    OmitType(EmailMethod, 
        [
        'codeVerification', 
        'codeExpiration', 
        'isValid', 
        "deletedAt",
        "updatedAt",
        "createdAt",
        "establishmentEmail",
        "establishmentSecondPhone",
        "establishmentfirstPhone",
        "userEmail",
        "userPhone"
    ]),
    ["email"],
) {};

export class CreateContactVerificationDTO 
    extends PickType(ContactVerificationEntity, []){};

export class UpdateContactVerificationDTO extends PartialType(CreateContactVerificationDTO) {};