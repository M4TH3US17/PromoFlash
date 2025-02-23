import { Module } from '@nestjs/common';
import { EstablishmentController } from './establishment.controller';
import { EstablishmentRepositoryImpl } from './establishment.repository-impl';
import { GetAllEstablishmentsUseCase } from './usecases/get-all-establishments.usecase';
import { EstablishmentEntity } from './establishment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReceitaFederalModule } from 'src/infrastructure/external_services/br_federal_revenue_service/receita-federal.module';
import { FindEstablishmentByCNPJUseCase } from 'src/infrastructure/external_services/br_federal_revenue_service/usecases/find-establishment-by-cnpj.usecase';
import { CreateEstablishmentsUseCase } from './usecases/create-establishment.usecase';
import { ContactEntity } from '../contact/contact.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ 
      ContactEntity,
      EstablishmentEntity, 
    ]),
    ReceitaFederalModule,
  ],
  controllers: [ EstablishmentController ],
  providers: [
    {
      provide: "ESTABLISHMENT_REPOSITORY",
      useClass: EstablishmentRepositoryImpl
    },

    // external_services
    FindEstablishmentByCNPJUseCase,

    // usecases
    GetAllEstablishmentsUseCase,
    CreateEstablishmentsUseCase, 
  ],
})
export class EstablishmentModule {}