import { OmitType, PartialType } from "@nestjs/swagger";
import { ContactEntity } from "../contact.entity";

export class CreateContactRequestDTO extends OmitType(ContactEntity, 
    ["establishment", "user", "id", "createdAt", "updatedAt"]) { };

export class UpdateContactRequestDTO extends PartialType(CreateContactRequestDTO) { };