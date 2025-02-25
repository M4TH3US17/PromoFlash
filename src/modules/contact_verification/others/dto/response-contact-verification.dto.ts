import { ContactVerificationEntity } from "@modules/contact_verification/contact-verification.entity";
import { OmitType } from "@nestjs/swagger";


export class ResponseContactVerificationDTO extends OmitType(ContactVerificationEntity, []){};