import { PromotionEntity } from "./promotion.entity";
import { CreatePromotionRequestDTO } from "./dto/create-promotion.dto";
import { UpdatePromotionRequestDTO } from "./dto/update-promotion.dto";
import { IPromotionRepositoryContract } from "src/infrastructure/repository_contracts/Ipromotion.repository-contract";

class PromotionRepositoryImpl implements IPromotionRepositoryContract {

    getAllAsync(): Promise<PromotionEntity[]> {
        throw new Error("Method not implemented.");
    };

    getByIdAsync(id: number): Promise<PromotionEntity> {
        throw new Error("Method not implemented.");
    };

    createAsync(entityToCreate: CreatePromotionRequestDTO): Promise<PromotionEntity> {
        throw new Error("Method not implemented.");
    };

    updateAsync(id: number, entityToUpdate: UpdatePromotionRequestDTO): Promise<PromotionEntity> {
        throw new Error("Method not implemented.");
    };

    deleteAsync(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    };

};