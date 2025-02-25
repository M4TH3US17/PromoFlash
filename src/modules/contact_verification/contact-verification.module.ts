import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ContactVerificationEntity } from "./contact-verification.entity";
import { ContactVerificationRepositoryImpl } from "./contact-verification.repository-impl";
import { ContactVerificationController } from "./contact-verification.controller";
import { 
    EmailMethod, 
    PhoneMethod 
} from "./contact_methods";

@Module({
    imports: [
        TypeOrmModule.forFeature([ 
            EmailMethod, 
            PhoneMethod, 
            ContactVerificationEntity 
        ])
    ],
    controllers: [
        ContactVerificationController,
    ],
    providers: [
        {
            provide: "CONTACT_VERIFICATION_CONTRACT",
            useClass: ContactVerificationRepositoryImpl
        }
    ]
})
export class ContactVerificationModule {};