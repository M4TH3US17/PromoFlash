import { PromotionEntity } from '@modules/promotion/promotion.entity';
import { OmitType } from '@nestjs/swagger';

export class PromotionResponseDTO extends OmitType(PromotionEntity, ["products", "establishment", "createdAt", "updatedAt"] as const) {}