import { EstablishmentEntity } from "./establishment.entity";
import { IEstablishmentRepositoryContract } from "src/infrastructure/repository_contracts/Iestablishment.repository-contract";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PaginatedList } from "src/shared/types/pagination.types";
import { CreateEstablishmentRequestDTO, UpdateEstablishmentRequestDTO } from "./others/dto/request-establishment.dto";

@Injectable()
export class EstablishmentRepositoryImpl implements IEstablishmentRepositoryContract {

    constructor(
        @InjectRepository(EstablishmentEntity)
        private readonly establishmentRepository: Repository<EstablishmentEntity>,
    ) {}

    async getAllAsync(): Promise<PaginatedList<EstablishmentEntity>> {
        throw new Error("Method not implemented.");
    };
    
    async getByIdAsync(id: number): Promise<EstablishmentEntity> {
        throw new Error("Method not implemented.");
    };
    
    async createAsync(entityToCreate: CreateEstablishmentRequestDTO): Promise<EstablishmentEntity> {
        throw new Error("Method not implemented.");
    };
    
    async updateAsync(id: number, entityToUpdate: UpdateEstablishmentRequestDTO): Promise<EstablishmentEntity> {
        throw new Error("Method not implemented.");
    };
    
    async deleteAsync(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    };
    
    async getByCNPJAsync(cnpj: string): Promise<EstablishmentEntity> {
        throw new Error("Method not implemented.");
    };

    // async isAffiliatedToMainStoreAsync(cnpjAffiliated: string, cnpjMainStore: string): Promise<boolean> {
        //     throw new Error("Method not implemented.");
    // };

};