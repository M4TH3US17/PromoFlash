import { PartialType } from "@nestjs/swagger";

export class CreateEstablishmentRequestDTO { };

export class UpdateEstablishmentRequestDTO extends PartialType(CreateEstablishmentRequestDTO) { };