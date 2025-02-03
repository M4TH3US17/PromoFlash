import { UserEntity } from "../user.entity";
import { OmitType } from "@nestjs/mapped-types";

export class UserResponseDTO extends OmitType(UserEntity, [] as const) {}