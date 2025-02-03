import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserRepositoryImpl } from './user.repository-impl';
import { GetAllUsersUseCase } from './usecases/get-all-users.usecase';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    {
      provide: "USER_REPOSITORY",
      useClass: UserRepositoryImpl
    },

    // usecases
    GetAllUsersUseCase,
  ]
})
export class UserModule {}