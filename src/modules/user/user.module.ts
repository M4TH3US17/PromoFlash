import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { AddressEntity } from '@modules/address/address.entity';
import { TwilioSMSService } from '@infrastructure/external_services/twilio/sms/sms.service';

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
    TwilioSMSService,

    // usecases
    UserService,
  ]
})
export class UserModule {}