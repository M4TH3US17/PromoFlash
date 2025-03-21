import { Module } from '@nestjs/common';
import { PromotionController } from './promotion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PromotionEntity } from './promotion.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ PromotionEntity ]),
  ],
  controllers: [
    PromotionController
  ],
  providers: [
  ],
})
export class PromotionModule {}