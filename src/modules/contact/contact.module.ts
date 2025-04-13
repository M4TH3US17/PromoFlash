import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "@modules/user/user.entity";
import { EstablishmentEntity } from "@modules/establishment/establishment.entity";
import { VenomModule } from "@infrastructure/external_services/venom/venom.module";
import { ContactVerificationEntity } from "./verification/verification.entity";
import { ContactController } from "./contact.controller";
import { ContactVerificationService } from "./verification/verification.service";
import { EmailEntity } from "./email/email.entity";
import { PhoneEntity } from "./phone/phone.entity";
import { PhoneService } from "./phone/phone.service";
import { EmailService } from "./email/email.service";

@Module({
    imports: [
        VenomModule,
        TypeOrmModule.forFeature([
            ContactVerificationEntity,
            EmailEntity,
            PhoneEntity,
            UserEntity,
            EstablishmentEntity,
        ])
    ],
    controllers: [
        ContactController,
    ],
    providers: [
        ContactVerificationService,
        PhoneService,
        EmailService,
    ],
    exports: [
        ContactVerificationService,
        PhoneService,
        EmailService,
    ]
})
export class ContactModule { };