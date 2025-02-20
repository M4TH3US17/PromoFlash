import { OmitType } from '@nestjs/swagger';
import { ContactEntity } from "../contact.entity";

export class ContactResponseDTO extends OmitType(ContactEntity, ["user", "establishment", "createdAt", "updatedAt"] as const) {}