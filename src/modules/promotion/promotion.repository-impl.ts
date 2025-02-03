import { PromotionEntity } from "./promotion.entity";
import { CreatePromotionRequestDTO } from "./dto/create-promotion.dto";
import { UpdatePromotionRequestDTO } from "./dto/update-promotion.dto";
import { IPromotionRepositoryContract } from "src/infrastructure/repository_contracts/Ipromotion.repository-contract";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class PromotionRepositoryImpl implements IPromotionRepositoryContract {

    constructor(
        @InjectRepository(PromotionEntity)
        private readonly promotionRepository: Repository<PromotionEntity>,
    ) {}
    
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