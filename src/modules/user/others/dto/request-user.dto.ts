import { UserEntity } from "@modules/user/user.entity";
import { OmitType, PartialType } from "@nestjs/swagger";

export class CreateUserRequestDTO extends OmitType(UserEntity,  
    ["createdAt", "updatedAt", "id", "followingEstablishments"]) { };

export class UpdateUserRequestDTO extends PartialType(CreateUserRequestDTO) { };