import { PromotionEntity } from "./promotion.entity";
import { IPromotionRepositoryContract } from "src/infrastructure/repository_contracts/Ipromotion.repository-contract";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreatePromotionRequestDTO, UpdatePromotionRequestDTO } from "./dto/request-promotion.dto";
import { PaginatedList } from "src/shared/types/pagination.types";

@Injectable()
export class PromotionRepositoryImpl implements IPromotionRepositoryContract {

    constructor(
        @InjectRepository(PromotionEntity)
        private readonly promotionRepository: Repository<PromotionEntity>,
    ) {}
    
    getAllAsync(): Promise<PaginatedList<PromotionEntity>> {
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