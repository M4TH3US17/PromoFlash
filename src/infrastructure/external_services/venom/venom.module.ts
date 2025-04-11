import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { VenomWhatsappService } from "./venom.service";

@Module({
    imports: [
    ],
    providers: [
        VenomWhatsappService
    ],
    exports: [],
})
export class VenomModule {} 