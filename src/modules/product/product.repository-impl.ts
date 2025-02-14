import { ProductEntity } from "./product.entity";
import { IProductRepositoryContract } from "src/infrastructure/repository_contracts/Iproduct.repository-contract";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateProductRequestDTO, UpdateProductRequestDTO } from "./dto/request-product.dto";
import { PaginatedList } from "src/shared/types/pagination.types";

@Injectable()
export class ProductRepositoryImpl implements IProductRepositoryContract {

    constructor(
        @InjectRepository(ProductEntity)
        private readonly productRepository: Repository<ProductEntity>,
    ) {}

    getAllAsync(): Promise<PaginatedList<ProductEntity>> {
        throw new Error("Method not implemented.");
    };

    getByIdAsync(id: number): Promise<ProductEntity> {
        throw new Error("Method not implemented.");
    };

    createAsync(entityToCreate: CreateProductRequestDTO): Promise<ProductEntity> {
        throw new Error("Method not implemented.");
    };

    updateAsync(id: number, entityToUpdate: UpdateProductRequestDTO): Promise<ProductEntity> {
        throw new Error("Method not implemented.");
    };

    deleteAsync(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    };

};