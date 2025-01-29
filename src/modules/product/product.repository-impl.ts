import { IProductRepositoryContract } from "src/infrastructure/repository_contracts/Iproduct.repository-contract";
import { CreateProductDTO, UpdateProductDTO } from "./dto/product.dto";
import { ProductEntity } from "./product.entity";


class ProductRepositoryImpl implements IProductRepositoryContract {

    getAll(): Promise<ProductEntity[]> {
        throw new Error("Method not implemented.");
    };

    getById(id: number): Promise<ProductEntity> {
        throw new Error("Method not implemented.");
    };

    create(entityToCreate: CreateProductDTO): Promise<ProductEntity> {
        throw new Error("Method not implemented.");
    };

    update(id: number, entityToUpdate: UpdateProductDTO): Promise<ProductEntity> {
        throw new Error("Method not implemented.");
    };

    delete(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    };

};