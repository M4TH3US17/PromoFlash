import { Module } from "@nestjs/common";
import { TwilioWhatsappService } from "./whatsapp/whatsapp.service";
import { TwilioSMSService } from "./sms/sms.service";
import { HttpModule } from "@nestjs/axios";

@Module({
    imports: [
        HttpModule,
    ],
    providers: [
        TwilioSMSService,
        TwilioWhatsappService,
    ],
    exports: [],
})
export class TwilioModule {} 