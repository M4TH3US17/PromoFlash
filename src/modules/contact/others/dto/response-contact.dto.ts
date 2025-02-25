import { ContactEntity } from '@modules/contact/contact.entity';
import { OmitType } from '@nestjs/swagger';

export class ContactResponseDTO extends OmitType(ContactEntity, ["user", "establishment", "createdAt", "updatedAt"] as const) {}