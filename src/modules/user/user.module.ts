import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { AddressEntity } from '@modules/address/address.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ 
      UserEntity,
      AddressEntity,
     ]),
  ],
  controllers: [
    UserController,
  ],
  providers: [

    // usecases
    UserService,
  ]
})
export class UserModule {}