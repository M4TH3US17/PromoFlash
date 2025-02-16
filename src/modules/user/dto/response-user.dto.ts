import { UserEntity } from "../user.entity";
import { OmitType } from '@nestjs/swagger';

export class UserResponseDTO extends OmitType(UserEntity, [] as const) {}