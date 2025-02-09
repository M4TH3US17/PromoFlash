import { BasePaginationDTO } from "src/shared/bases/base-pagination.dto";
import { ProductEntity } from "../product.entity";

export class ProductPaginationDTO extends BasePaginationDTO<ProductEntity> {
};