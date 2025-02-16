import { OmitType, PartialType } from "@nestjs/swagger";
import { ProductEntity } from "../product.entity";

export class CreateProductRequestDTO extends OmitType(ProductEntity,  ["createdAt", "updatedAt", "id"]) { };

export class UpdateProductRequestDTO extends PartialType(CreateProductRequestDTO) { };