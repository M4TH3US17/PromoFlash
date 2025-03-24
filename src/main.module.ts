import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AddressModule } from './modules/address/address.module';
import { CouponModule } from './modules/coupon/coupon.module';
import { EstablishmentModule } from './modules/establishment/establishment.module';
import { ProductModule } from './modules/product/product.module';
import { PromotionModule } from './modules/promotion/promotion.module';
import { UserModule } from './modules/user/user.module';
import { AppDataSource } from './infrastructure/database/data-source';
import { envValidationSchema } from './config/joi.config';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './config/filters/http-exception.filter';
import { ContactVerificationModule } from '@modules/contact_verification/contact-verification.module';
import { CNPJServiceModule } from '@infrastructure/external_services/cnpj_service/cnpj-service.module';
import { TwilioModule } from '@infrastructure/external_services/twilio/twilio.module';
import { AuthenticationModule } from '@modules/authentication/authentication.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthorizationGuard } from '@modules/authentication/others/guards/authorization.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envValidationSchema,
    }),
    TypeOrmModule.forRoot(AppDataSource.options),

    // External Services
    CNPJServiceModule,
    TwilioModule,

    // Domains
    AddressModule,
    ContactVerificationModule,
    CouponModule,
    EstablishmentModule,
    ProductModule,
    PromotionModule,
    UserModule,
    AuthenticationModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: AuthorizationGuard,
    },
  ]
})
export class MainModule { }