import { Module } from '@nestjs/common';
import { AddressController } from './address.controller';
import { AddressRepositoryImpl } from './address.repository-impl';
import { GetAllAddressesUseCase } from './usecases/get-all-addresses.usecase';
import { AddressEntity } from './address.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateAddressUseCase } from './usecases/create-address.usecase';
import { GetAddressByIdUseCase } from './usecases/get-address-by-id.usecase';
import { UpdateAddressUseCase } from './usecases/update-address.usecase';
import { SoftDeleteAddressUseCase } from './usecases/soft-delete-address.usecase';

@Module({
  imports: [
    TypeOrmModule.forFeature([ AddressEntity ]),
  ],
  controllers: [ 
    AddressController,
  ],
  providers: [
    {
      provide: "ADDRESS_REPOSITORY",
      useClass: AddressRepositoryImpl
    },

    // usecases
    GetAllAddressesUseCase,
    GetAddressByIdUseCase,
    CreateAddressUseCase,
    UpdateAddressUseCase,
    SoftDeleteAddressUseCase,
  ],
})
export class AddressModule {}