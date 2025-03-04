import { Module } from "@nestjs/common";
import { TwilioWhatsappService } from "./whatsapp/whatsapp.service";
import { TwilioSMSService } from "./sms/sms.service";

@Module({
    imports: [],
    providers: [
        TwilioSMSService,
        TwilioWhatsappService,
    ],
    exports: [],
})
export class TwilioModule {} 