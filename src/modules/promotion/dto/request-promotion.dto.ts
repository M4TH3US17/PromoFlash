import { OmitType, PartialType } from "@nestjs/swagger";
import { PromotionEntity } from "../promotion.entity";

export class CreatePromotionRequestDTO extends OmitType(PromotionEntity,  ["createdAt", "updatedAt", "id"]) { };

export class UpdatePromotionRequestDTO extends PartialType(CreatePromotionRequestDTO) { };