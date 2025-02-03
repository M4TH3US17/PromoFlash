import { Module } from '@nestjs/common';
import { ContactController } from './contact.controller';
import { ContactRepositoryImpl } from './contact.repository-impl';
import { GetAllContactsUseCase } from './usecases/get-all-contacts.usecase';

@Module({
  imports: [],
  controllers: [ContactController],
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