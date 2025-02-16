import { ProductEntity } from "../product.entity";
import { OmitType } from '@nestjs/swagger';

export class ProductResponseDTO extends OmitType(ProductEntity, [] as const) {}