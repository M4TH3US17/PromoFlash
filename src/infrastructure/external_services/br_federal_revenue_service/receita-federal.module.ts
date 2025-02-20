import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { FindEstablishmentByCNPJUseCase } from './usecases/find-establishment-by-cnpj.usecase';

@Module({
    imports: [
        HttpModule
    ],
    providers: [
        FindEstablishmentByCNPJUseCase,
    ],
})
export class ReceitaFederalModule { }
