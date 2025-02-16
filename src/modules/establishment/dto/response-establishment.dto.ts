import { OmitType } from '@nestjs/swagger';
import { EstablishmentEntity } from "../establishment.entity";

export class EstablishmentResponseDTO extends OmitType(EstablishmentEntity, [] as const) {}