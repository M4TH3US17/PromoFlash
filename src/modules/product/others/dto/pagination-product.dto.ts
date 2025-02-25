import { ProductEntity } from "@modules/product/product.entity";
import { BasePaginationDTO } from "src/shared/bases/base-pagination.dto";

export class ProductPaginationDTO extends BasePaginationDTO<ProductEntity> {
};