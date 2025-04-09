import { ProductEntity } from '@modules/product/product.entity';
import { OmitType } from '@nestjs/swagger';

export class ProductResponseDTO extends OmitType(ProductEntity, [] as const) {}