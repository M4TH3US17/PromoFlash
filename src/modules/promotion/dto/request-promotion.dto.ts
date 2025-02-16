import { PartialType } from "@nestjs/swagger";

export class CreatePromotionRequestDTO { };

export class UpdatePromotionRequestDTO extends PartialType(CreatePromotionRequestDTO) { };