import { PartialType } from "@nestjs/mapped-types";

export class CreateContactRequestDTO { };

export class UpdateContactRequestDTO extends PartialType(CreateContactRequestDTO) { };