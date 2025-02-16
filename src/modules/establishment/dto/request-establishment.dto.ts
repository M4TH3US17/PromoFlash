import { OmitType, PartialType } from "@nestjs/swagger";
import { EstablishmentEntity } from "../establishment.entity";

export class CreateEstablishmentRequestDTO extends OmitType(EstablishmentEntity,  ["createdAt", "updatedAt", "id", "promotions"]) { };

export class UpdateEstablishmentRequestDTO extends PartialType(CreateEstablishmentRequestDTO) { };