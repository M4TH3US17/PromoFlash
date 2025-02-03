import { OmitType } from "@nestjs/mapped-types";
import { ContactEntity } from "../contact.entity";

export class ContactResponseDTO extends OmitType(ContactEntity, ["user", "establishment"] as const) {}