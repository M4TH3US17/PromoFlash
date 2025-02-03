import { PartialType } from '@nestjs/mapped-types';
import { CreateContactRequestDTO } from './create-contact.dto';

export class UpdateContactRequestDTO extends PartialType(CreateContactRequestDTO) { };