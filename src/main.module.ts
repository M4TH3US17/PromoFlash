import { Module } from '@nestjs/common';

import { UserEntity } from './modules/user/user.entity';
import { ContactEntity } from './modules/contact/contact.entity';
import { AddressEntity } from './modules/address/address.entity';
import { CouponEntity } from './modules/coupon/coupon.entity';
import { PromotionEntity } from './modules/promotion/promotion.entity';
import { ProductEntity } from './modules/product/product.entity';
import { EstablishmentEntity } from './modules/establishment/establishment.entity';
import { EstablishmentCustomers } from './modules/establishment_customers/establishment_customers.entity';
import { EstablishmentProduct } from './modules/establishments_products/establishments_products.entity';

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

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envValidationSchema,
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      database:  process.env.DB_NAME,
      host:      process.env.DB_HOST,
      port:      Number(process.env.DB_PORT) || 5432,
      username:  process.env.DB_USERNAME,
      password:  process.env.DB_PASSWORD,
      entities: [
          UserEntity,
          ContactEntity,
          AddressEntity,
          CouponEntity,
          PromotionEntity,
          ProductEntity,
          EstablishmentEntity,
          EstablishmentCustomers,
          EstablishmentProduct,
      ],
      synchronize: false,
      /*migrations: [
          `${__dirname}/infrastructure/migrations/{.ts,*js}`,
      ],
      migrationsRun: true,*/
  }),

  // modules
  AddressModule,
  ContactModule,
  CouponModule,
  EstablishmentModule,
  ProductModule,
  PromotionModule,
  UserModule,
  ],
})
export class MainModule {}
