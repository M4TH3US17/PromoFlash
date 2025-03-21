import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ContactVerificationEntity } from "./contact-verification.entity";
import { ContactVerificationController } from "./contact-verification.controller";
import { ContactVerificationService } from "./contact-verification.service";
import { EmailEntity, PhoneEntity } from "./contact_methods";
import { UserEntity } from "@modules/user/user.entity";
import { EstablishmentEntity } from "@modules/establishment/establishment.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ContactVerificationEntity,
            EmailEntity, 
            PhoneEntity,
            UserEntity,
            EstablishmentEntity,
        ])
    ],
    controllers: [
        ContactVerificationController,
    ],
    providers: [
        ContactVerificationService,
    ]
})
export class ContactVerificationModule {};