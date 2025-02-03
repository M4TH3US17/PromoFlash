import { OmitType } from "@nestjs/mapped-types";
import { EstablishmentEntity } from "../establishment.entity";

export class EstablishmentResponseDTO extends OmitType(EstablishmentEntity, [] as const) {}