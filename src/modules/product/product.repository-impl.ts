import { ProductEntity } from "./product.entity";
import { CreateProductRequestDTO } from "./dto/create-product.dto";
import { UpdateProductRequestDTO } from "./dto/update-product.dto";
import { IProductRepositoryContract } from "src/infrastructure/repository_contracts/Iproduct.repository-contract";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class ProductRepositoryImpl implements IProductRepositoryContract {

    constructor(
        @InjectRepository(ProductEntity)
        private readonly productRepository: Repository<ProductEntity>,
    ) {}

    getAllAsync(): Promise<ProductEntity[]> {
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