import { UserEntity } from '@modules/user/user.entity';
import { OmitType } from '@nestjs/swagger';

export class UserResponseDTO extends OmitType(UserEntity, [] as const) {}