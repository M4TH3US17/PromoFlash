import { CreatePromotionRequestDTO, UpdatePromotionRequestDTO } from "@modules/promotion/others/dto/request-promotion.dto";
import { PromotionEntity } from "src/modules/promotion/promotion.entity";
import { IBaseRepositoryContract } from "src/shared/bases/Ibase.repository-contract";

export interface IPromotionRepositoryContract
    extends IBaseRepositoryContract<
        UpdatePromotionRequestDTO,
        CreatePromotionRequestDTO,
        PromotionEntity
    > {
        
};