import { PartialType } from '@nestjs/mapped-types';
import { CreateUserRequestDTO } from './create-user.dto';

export class UpdateUserRequestDTO extends PartialType(CreateUserRequestDTO) { };