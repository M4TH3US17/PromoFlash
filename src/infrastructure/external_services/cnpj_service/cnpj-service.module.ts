import { Module } from "@nestjs/common";
import { BrazilFederalRevenueService } from "./brazil_federal_revenue/brazil-federal-revenue.service";
import { HttpModule } from "@nestjs/axios";

@Module({
    imports: [
        HttpModule,
    ],
    providers: [
        BrazilFederalRevenueService,
    ]
})
export class CNPJServiceModule {}