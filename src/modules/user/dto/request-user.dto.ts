import { PartialType } from "@nestjs/swagger";

export class CreateUserRequestDTO { };

export class UpdateUserRequestDTO extends PartialType(CreateUserRequestDTO) { };