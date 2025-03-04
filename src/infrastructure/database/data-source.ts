import { AddressEntity } from "src/modules/address/address.entity";
import { ContactEntity } from "src/modules/contact/contact.entity";
import { CouponEntity } from "src/modules/coupon/coupon.entity";
import { EstablishmentEntity } from "src/modules/establishment/establishment.entity";
import { EstablishmentCustomers } from "src/modules/establishment_customers/establishment_customers.entity";
import { EstablishmentProduct } from "src/modules/establishments_products/establishments_products.entity";
import { ProductEntity } from "src/modules/product/product.entity";
import { PromotionEntity } from "src/modules/promotion/promotion.entity";
import { UserEntity } from "src/modules/user/user.entity";
import { DataSource } from "typeorm";
import { StartDatabase1738902087028 } from "./migrations/1738902087028-StartDatabase";
import { ContactVerificationEntity } from "@modules/contact_verification/contact-verification.entity";
import "dotenv/config";

export const AppDataSource = new DataSource({ 
      type: "postgres",
      database:  process.env.DB_NAME,
      host:      process.env.DB_HOST,
      port:      Number(process.env.DB_PORT) || 5432,
      username:  process.env.DB_USERNAME,
      password:  process.env.DB_PASSWORD.toString(),
      entities: [
          UserEntity,
          ContactEntity,
          ContactVerificationEntity,
          AddressEntity,
          CouponEntity,
          PromotionEntity,
          ProductEntity,
          EstablishmentEntity,
          EstablishmentCustomers,
          EstablishmentProduct, 
      ],
      logging: true,
      synchronize: false,
      migrationsRun: true,
      migrationsTableName: "migrations",
      migrations: [ StartDatabase1738902087028 ],
}); 