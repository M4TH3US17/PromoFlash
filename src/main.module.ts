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
import { envValidationSchema } from './shared/validations/env.validation';
import { AppDataSource } from './infrastructure/database/data-source';

@Module({
  imports: [

    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envValidationSchema,
    }),

    TypeOrmModule.forRoot(AppDataSource.options),

    AddressModule,
    ContactModule,
    CouponModule,
    EstablishmentModule,
    ProductModule,
    PromotionModule,
    UserModule,
  ],
})
export class MainModule { }
