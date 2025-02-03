import { PartialType } from '@nestjs/mapped-types';
import { CreateProductRequestDTO } from './create-product.dto';

export class UpdateProductRequestDTO extends PartialType(CreateProductRequestDTO) { };