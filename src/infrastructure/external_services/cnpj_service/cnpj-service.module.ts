import { Module } from "@nestjs/common";
import { BrazilFederalRevenue } from "./brazil_federal_revenue/brazil-federal-revenue.service";
import { HttpModule } from "@nestjs/axios";

@Module({
    imports: [
        HttpModule,
    ],
    providers: [
        BrazilFederalRevenue,
    ]
})
export class CNPJServiceModule {}