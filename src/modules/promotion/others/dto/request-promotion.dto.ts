import { PromotionEntity } from "@modules/promotion/promotion.entity";
import { OmitType, PartialType } from "@nestjs/swagger";

export class CreatePromotionRequestDTO extends OmitType(PromotionEntity,  ["createdAt", "updatedAt", "id"]) { };

export class UpdatePromotionRequestDTO extends PartialType(CreatePromotionRequestDTO) { };