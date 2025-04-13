import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { AddressEntity } from '@modules/address/address.entity';
import { TwilioSMSService } from '@infrastructure/external_services/twilio/sms/sms.service';
import { TwilioWhatsappService } from '@infrastructure/external_services/twilio/whatsapp/whatsapp.service';
import { VenomModule } from '@infrastructure/external_services/venom/venom.module';
import { TwilioModule } from '@infrastructure/external_services/twilio/twilio.module';
import { ContactVerificationEntity } from '@modules/contact/verification/verification.entity';
import { EmailEntity } from '@modules/contact/email/email.entity';
import { PhoneEntity } from '@modules/contact/phone/phone.entity';
import { ContactVerificationService } from '@modules/contact/verification/verification.service';
import { ContactModule } from '@modules/contact/contact.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ 
      UserEntity,
      PhoneEntity,
      EmailEntity,
      ContactVerificationEntity,
      AddressEntity,
     ]),

     TwilioModule,
     VenomModule,
     ContactModule,
  ],
  controllers: [
    UserController,
  ],
  providers: [
    UserService,
    ContactVerificationService,
  ]
})
export class UserModule {}