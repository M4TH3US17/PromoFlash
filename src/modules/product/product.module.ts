import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductRepositoryImpl } from './product.repository-impl';
import { GetAllProductsUseCase } from './usecases/get-all-products.usecase';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ ProductEntity ]),
  ],
  controllers: [
    ProductController
  ],
  providers: [
    {
      provide: "PRODUCT_REPOSITORY",
      useClass: ProductRepositoryImpl
    },

    // usecases
    GetAllProductsUseCase,
  ],
})
export class ProductModule {}