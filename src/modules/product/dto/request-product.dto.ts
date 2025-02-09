import { PartialType } from "@nestjs/mapped-types";

export class CreateProductRequestDTO { };

export class UpdateProductRequestDTO extends PartialType(CreateProductRequestDTO) { };