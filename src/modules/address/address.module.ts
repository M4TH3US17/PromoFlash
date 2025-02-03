import { Module } from '@nestjs/common';
import { AddressController } from './address.controller';
import { AddressRepositoryImpl } from './address.repository-impl';
import { GetAllAddressesUseCase } from './usecases/get-all-addresses.usecase';

@Module({
  imports: [],
  controllers: [ AddressController ],
  providers: [
    {
      provide: "ADDRESS_REPOSITORY",
      useClass: AddressRepositoryImpl
    },

    // usecases
    GetAllAddressesUseCase,
  ],
})
export class AddressModule {}