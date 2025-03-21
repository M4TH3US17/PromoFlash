import { Module } from '@nestjs/common';
import { CouponController } from './coupon.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CouponEntity } from './coupon.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ CouponEntity ]),
  ],
  controllers: [CouponController],
  providers: [
  ],
})
export class CouponModule {}