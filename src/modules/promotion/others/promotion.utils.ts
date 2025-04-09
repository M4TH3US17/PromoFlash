import { PromotionEntity } from "../promotion.entity";
import { ResponsePromotionDTO } from "./dto/response-promotion.dto";

export function mapPromotionEntityToDTO(entity: PromotionEntity): ResponsePromotionDTO {
    return {
        id: entity.id,
        title: entity.title,
        description: entity.description,
    }
};