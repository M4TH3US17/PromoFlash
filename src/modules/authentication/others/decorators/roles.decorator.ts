
import { UserRole } from '@modules/user/others/enums/user-role.enum';
import { Reflector } from '@nestjs/core';

export const Roles = Reflector.createDecorator<UserRole[]>();