import { ContactVerificationEntity } from "@modules/contact_verification/contact-verification.entity";
import { EmailMethod, PhoneMethod } from "@modules/contact_verification/contact_methods";
import { OmitType } from "@nestjs/swagger";

export class ResponsePhoneContactDTO extends OmitType(PhoneMethod, 
        [
        'codeVerification', 
        'codeExpiration',
        "deletedAt",
        "createdAt",
        "updatedAt",
        "establishmentEmail",
        "establishmentSecondPhone",
        "establishmentfirstPhone",
        "userEmail",
        "userPhone"
    ]) {
    };

export class ResponseEmailContactDTO extends OmitType(EmailMethod, 
        [
        'codeVerification',
        "codeExpiration", 
        "deletedAt",
        "createdAt",
        "updatedAt",
        "establishmentEmail",
        "establishmentSecondPhone",
        "establishmentfirstPhone",
        "userEmail",
        "userPhone"
    ]) {
    };


export class ResponseContactVerificationDTO extends OmitType(ContactVerificationEntity, []){};