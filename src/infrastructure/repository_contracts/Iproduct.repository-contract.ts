import { CreateProductDTO, UpdateProductDTO } from "src/modules/product/dto/product.dto";
import { ProductEntity } from "src/modules/product/product.entity";
import { IBaseRepositoryContract } from "src/shared/bases/Ibase.repository-contract";

export interface IProductRepositoryContract
    extends IBaseRepositoryContract<
        ProductEntity,
        UpdateProductDTO,
        CreateProductDTO
    > {
        
};