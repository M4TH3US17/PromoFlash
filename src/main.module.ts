import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AddressModule } from './modules/address/address.module';
import { ContactModule } from './modules/contact/contact.module';
import { CouponModule } from './modules/coupon/coupon.module';
import { EstablishmentModule } from './modules/establishment/establishment.module';
import { ProductModule } from './modules/product/product.module';
import { PromotionModule } from './modules/promotion/promotion.module';
import { UserModule } from './modules/user/user.module';
import { AppDataSource } from './infrastructure/database/data-source';
import { envValidationSchema } from './config/joi.config';
import { ReceitaFederalModule } from './infrastructure/external_services/br_federal_revenue_service/receita-federal.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './config/filters/http-exception.filter';
import { ContactVerificationModule } from '@modules/contact_verification/contact-verification.module';

@Module({
  imports: [

    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envValidationSchema,
    }),

    TypeOrmModule.forRoot(AppDataSource.options), 

    // External Services
    ReceitaFederalModule,

    // Domains
    AddressModule,
    ContactModule,
    ContactVerificationModule,
    CouponModule,
    EstablishmentModule,
    ProductModule,
    PromotionModule,
    UserModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ]
})
export class MainModule { }