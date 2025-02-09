import { PartialType } from "@nestjs/mapped-types";

export class CreatePromotionRequestDTO { };

export class UpdatePromotionRequestDTO extends PartialType(CreatePromotionRequestDTO) { };