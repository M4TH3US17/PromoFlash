import { OmitType, PartialType } from "@nestjs/swagger";
import { UserEntity } from "../user.entity";

export class CreateUserRequestDTO extends OmitType(UserEntity,  
    ["createdAt", "updatedAt", "id", "followingEstablishments"]) { };

export class UpdateUserRequestDTO extends PartialType(CreateUserRequestDTO) { };