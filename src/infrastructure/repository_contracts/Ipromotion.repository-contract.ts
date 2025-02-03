import { CreatePromotionRequestDTO } from "src/modules/promotion/dto/create-promotion.dto";
import { UpdatePromotionRequestDTO } from "src/modules/promotion/dto/update-promotion.dto";
import { PromotionEntity } from "src/modules/promotion/promotion.entity";
import { IBaseRepositoryContract } from "src/shared/bases/Ibase.repository-contract";

export interface IPromotionRepositoryContract
    extends IBaseRepositoryContract<
        UpdatePromotionRequestDTO,
        CreatePromotionRequestDTO,
        PromotionEntity
    > {
        
};