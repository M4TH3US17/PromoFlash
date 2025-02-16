import { PromotionEntity } from "../promotion.entity";
import { OmitType } from '@nestjs/swagger';

export class PromotionResponseDTO extends OmitType(PromotionEntity, [] as const) {}