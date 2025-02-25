import { ContactVerificationEntity } from "@modules/contact_verification/contact-verification.entity";
import { OmitType, PartialType } from "@nestjs/swagger";

export class CreateContactVerificationDTO extends OmitType(ContactVerificationEntity, []){};

export class UpdateContactVerificationDTO extends PartialType(CreateContactVerificationDTO) {};