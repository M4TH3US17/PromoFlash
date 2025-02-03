import { Module } from '@nestjs/common';
import { ContactController } from './contact.controller';
import { ContactRepositoryImpl } from './contact.repository-impl';
import { GetAllContactsUseCase } from './usecases/get-all-contacts.usecase';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactEntity } from './contact.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ ContactEntity ]),
  ],
  controllers: [
    ContactController,
  ],
  providers: [
    {
      provide: "CONTACT_REPOSITORY",
      useClass: ContactRepositoryImpl
    },

    // usecases
    GetAllContactsUseCase,
  ],
})
export class ContactModule {}