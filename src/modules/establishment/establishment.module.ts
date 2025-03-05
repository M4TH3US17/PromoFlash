import { Module } from '@nestjs/common';
import { EstablishmentController } from './establishment.controller';
import { EstablishmentRepositoryImpl } from './establishment.repository-impl';
import { GetAllEstablishmentsUseCase } from './usecases/get-all-establishments.usecase';
import { EstablishmentEntity } from './establishment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReceitaFederalModule } from 'src/infrastructure/external_services/br_federal_revenue_service/receita-federal.module';
import { FindEstablishmentByCNPJUseCase } from 'src/infrastructure/external_services/br_federal_revenue_service/usecases/find-establishment-by-cnpj.usecase';
import { CreateEstablishmentsUseCase } from './usecases/create-establishment.usecase';
import { TwilioSMSService } from '@infrastructure/external_services/twilio/sms/sms.service';
import { TwilioModule } from '@infrastructure/external_services/twilio/twilio.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ 
      EstablishmentEntity, 
    ]),

    ReceitaFederalModule, // depreciado
    TwilioModule, 

  ],
  controllers: [ EstablishmentController ],
  providers: [
    {
      provide: "ESTABLISHMENT_REPOSITORY",
      useClass: EstablishmentRepositoryImpl
    },

    // external_services
    FindEstablishmentByCNPJUseCase, // depreciado
    TwilioSMSService,

    // usecases
    GetAllEstablishmentsUseCase,
    CreateEstablishmentsUseCase, 
  ],
})
export class EstablishmentModule {}