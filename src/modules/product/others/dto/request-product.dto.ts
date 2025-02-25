import { ProductEntity } from "@modules/product/product.entity";
import { OmitType, PartialType } from "@nestjs/swagger";

export class CreateProductRequestDTO extends OmitType(ProductEntity,  ["createdAt", "updatedAt", "id"]) { };

export class UpdateProductRequestDTO extends PartialType(CreateProductRequestDTO) { };