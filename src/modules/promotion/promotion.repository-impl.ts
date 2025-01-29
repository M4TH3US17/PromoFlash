import { IPromotionRepositoryContract } from "src/infrastructure/repository_contracts/Ipromotion.repository-contract";
import { CreatePromotionDTO, UpdatePromotionDTO } from "./dto/promotion.dto";
import { PromotionEntity } from "./promotion.entity";

class PromotionRepositoryImpl implements IPromotionRepositoryContract {

    getAll(): Promise<PromotionEntity[]> {
        throw new Error("Method not implemented.");
    };

    getById(id: number): Promise<PromotionEntity> {
        throw new Error("Method not implemented.");
    };

    create(entityToCreate: CreatePromotionDTO): Promise<PromotionEntity> {
        throw new Error("Method not implemented.");
    };

    update(id: number, entityToUpdate: UpdatePromotionDTO): Promise<PromotionEntity> {
        throw new Error("Method not implemented.");
    };

    delete(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    };

};