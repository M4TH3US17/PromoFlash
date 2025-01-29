import { CreatePromotionDTO, UpdatePromotionDTO } from "src/modules/promotion/dto/promotion.dto";
import { PromotionEntity } from "src/modules/promotion/promotion.entity";
import { IBaseRepositoryContract } from "src/shared/bases/Ibase.repository-contract";

export interface IPromotionRepositoryContract
    extends IBaseRepositoryContract<
        PromotionEntity,
        UpdatePromotionDTO,
        CreatePromotionDTO
    > {
        
};