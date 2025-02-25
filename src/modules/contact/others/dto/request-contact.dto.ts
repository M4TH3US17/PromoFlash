import { ContactEntity } from "@modules/contact/contact.entity";
import { OmitType, PartialType } from "@nestjs/swagger";

export class CreateContactRequestDTO extends OmitType(ContactEntity, 
    ["establishment", "user", "id", "createdAt", "updatedAt", "deletedAt", "secondContact"]) { };

export class UpdateContactRequestDTO extends PartialType(CreateContactRequestDTO) { };