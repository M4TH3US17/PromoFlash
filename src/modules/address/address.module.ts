import { Module } from '@nestjs/common';
import { AddressController } from './address.controller';
import { AddressEntity } from './address.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([ AddressEntity ]),
  ],
  controllers: [ 
    AddressController,
  ],
  providers: [
  ],
})
export class AddressModule {}