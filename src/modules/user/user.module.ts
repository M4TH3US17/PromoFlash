import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { AddressEntity } from '@modules/address/address.entity';
import { TwilioSMSService } from '@infrastructure/external_services/twilio/sms/sms.service';
import { ContactVerificationEntity } from '@modules/contact_verification/contact-verification.entity';
import { EmailEntity, PhoneEntity } from '@modules/contact_verification/contact_methods';
import { TwilioWhatsappService } from '@infrastructure/external_services/twilio/whatsapp/whatsapp.service';
import { VenomWhatsappService } from '@infrastructure/external_services/venom/venom.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ 
      UserEntity,
      PhoneEntity,
      EmailEntity,
      ContactVerificationEntity,
      AddressEntity,
     ]),
  ],
  controllers: [
    UserController,
  ],
  providers: [
    TwilioSMSService,
    TwilioWhatsappService,

    // usecases
    UserService,
    VenomWhatsappService,
  ]
})
export class UserModule {}