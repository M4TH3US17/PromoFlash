import { PromotionEntity } from "../promotion.entity";
import { OmitType } from "@nestjs/mapped-types";

export class PromotionResponseDTO extends OmitType(PromotionEntity, [] as const) {}