import { Module } from '@nestjs/common';
import { EstablishmentController } from './establishment.controller';
import { EstablishmentRepositoryImpl } from './establishment.repository-impl';
import { GetAllEstablishmentsUseCase } from './usecases/get-all-establishments.usecase';
import { EstablishmentEntity } from './establishment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateEstablishmentsUseCase } from './usecases/create-establishment.usecase';
import { TwilioSMSService } from '@infrastructure/external_services/twilio/sms/sms.service';
import { TwilioModule } from '@infrastructure/external_services/twilio/twilio.module';
import { CNPJServiceModule } from '@infrastructure/external_services/cnpj_service/cnpj-service.module';
import { BrazilFederalRevenueService } from '@infrastructure/external_services/cnpj_service/brazil_federal_revenue/brazil-federal-revenue.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ 
      EstablishmentEntity, 
    ]),

    CNPJServiceModule,
    TwilioModule, 

  ],
  controllers: [ EstablishmentController ],
  providers: [
    {
      provide: "ESTABLISHMENT_REPOSITORY",
      useClass: EstablishmentRepositoryImpl
    },

    // external_services
    BrazilFederalRevenueService,
    TwilioSMSService,

    // usecases
    GetAllEstablishmentsUseCase,
    CreateEstablishmentsUseCase, 
  ],
})
export class EstablishmentModule {}