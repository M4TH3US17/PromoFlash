import { PartialType } from "@nestjs/mapped-types";

export class CreateUserRequestDTO { };

export class UpdateUserRequestDTO extends PartialType(CreateUserRequestDTO) { };