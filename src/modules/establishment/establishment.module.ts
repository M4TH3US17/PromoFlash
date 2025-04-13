import { Module } from '@nestjs/common';
import { EstablishmentController } from './establishment.controller';
import { GetAllEstablishmentsUseCase } from './usecases/get-all-establishments.usecase';
import { EstablishmentEntity } from './establishment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateEstablishmentsUseCase } from './usecases/create-establishment.usecase';
import { TwilioSMSService } from '@infrastructure/external_services/twilio/sms/sms.service';
import { TwilioModule } from '@infrastructure/external_services/twilio/twilio.module';
import { CNPJServiceModule } from '@infrastructure/external_services/cnpj_service/cnpj-service.module';
import { BrazilFederalRevenueService } from '@infrastructure/external_services/cnpj_service/brazil_federal_revenue/brazil-federal-revenue.service';
import { EstablishmentService } from './establishment.service';
import { AddressEntity } from '@modules/address/address.entity';
import { PhoneEntity } from '@modules/contact/phone/phone.entity';
import { EmailEntity } from '@modules/contact/email/email.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ 
      EstablishmentEntity,
      PhoneEntity,
      EmailEntity,
      AddressEntity,
    ]),

    CNPJServiceModule,
    TwilioModule, 

  ],
  controllers: [ EstablishmentController ],
  providers: [

    // external_services
    BrazilFederalRevenueService,
    TwilioSMSService,

    // usecases
    GetAllEstablishmentsUseCase,
    CreateEstablishmentsUseCase, 
    EstablishmentService
  ],
})
export class EstablishmentModule {}