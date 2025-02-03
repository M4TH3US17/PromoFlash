import { Module } from '@nestjs/common';
import { CouponController } from './coupon.controller';
import { CouponRepositoryImpl } from './coupon.repository-impl';
import { GetAllCouponsUseCase } from './usecases/get-all-coupons.usecase';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CouponEntity } from './coupon.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ CouponEntity ]),
  ],
  controllers: [CouponController],
  providers: [
    {
      provide: "COUPON_REPOSITORY",
      useClass: CouponRepositoryImpl
    },

    // usecases
    GetAllCouponsUseCase,
  ],
})
export class CouponModule {}