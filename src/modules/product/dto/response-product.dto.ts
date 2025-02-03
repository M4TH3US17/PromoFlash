import { ProductEntity } from "../product.entity";
import { OmitType } from "@nestjs/mapped-types";

export class ProductResponseDTO extends OmitType(ProductEntity, [] as const) {}