import { PartialType } from "@nestjs/mapped-types";

export class CreateEstablishmentRequestDTO { };

export class UpdateEstablishmentRequestDTO extends PartialType(CreateEstablishmentRequestDTO) { };