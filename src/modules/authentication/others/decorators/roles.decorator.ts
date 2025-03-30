
import { UserRole } from '@modules/user/others/enums/user.enums';
import { Reflector } from '@nestjs/core';

export const Roles = Reflector.createDecorator<UserRole[]>();