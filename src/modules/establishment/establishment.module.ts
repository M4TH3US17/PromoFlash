import { Module } from '@nestjs/common';
import { EstablishmentController } from './establishment.controller';
import { EstablishmentRepositoryImpl } from './establishment.repository-impl';
import { GetAllEstablishmentsUseCase } from './usecases/get-all-establishments.usecase';

@Module({
  imports: [],
  controllers: [EstablishmentController],
  providers: [
    {
      provide: "ESTABLISHMENT_REPOSITORY",
      useClass: EstablishmentRepositoryImpl
    },

    // usecases
    GetAllEstablishmentsUseCase,
  ],
})
export class EstablishmentModule {}