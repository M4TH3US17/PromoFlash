import { PartialType } from "@nestjs/swagger";

export class CreateContactRequestDTO { };

export class UpdateContactRequestDTO extends PartialType(CreateContactRequestDTO) { };