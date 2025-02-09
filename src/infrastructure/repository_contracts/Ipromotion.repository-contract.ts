import { CreatePromotionRequestDTO, UpdatePromotionRequestDTO } from "src/modules/promotion/dto/request-promotion.dto";
import { PromotionEntity } from "src/modules/promotion/promotion.entity";
import { IBaseRepositoryContract } from "src/shared/bases/Ibase.repository-contract";

export interface IPromotionRepositoryContract
    extends IBaseRepositoryContract<
        UpdatePromotionRequestDTO,
        CreatePromotionRequestDTO,
        PromotionEntity
    > {
        
};