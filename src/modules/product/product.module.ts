import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductRepositoryImpl } from './product.repository-impl';
import { GetAllProductsUseCase } from './usecases/get-all-products.usecase';

@Module({
  imports: [],
  controllers: [ProductController],
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