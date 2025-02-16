import { PartialType } from "@nestjs/swagger";

export class CreateProductRequestDTO { };

export class UpdateProductRequestDTO extends PartialType(CreateProductRequestDTO) { };