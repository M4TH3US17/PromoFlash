import { CreateProductRequestDTO, UpdateProductRequestDTO } from "@modules/product/others/dto/request-product.dto";
import { ProductEntity } from "src/modules/product/product.entity";
import { IBaseRepositoryContract } from "src/shared/bases/Ibase.repository-contract";

export interface IProductRepositoryContract
    extends IBaseRepositoryContract<
        UpdateProductRequestDTO,
        CreateProductRequestDTO,
        ProductEntity
    > {
        
};