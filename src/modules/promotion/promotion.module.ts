import { Module } from '@nestjs/common';
import { PromotionController } from './promotion.controller';
import { PromotionRepositoryImpl } from './promotion.repository-impl';
import { GetAllPromotionsUseCase } from './usecases/get-all-promotions.usecase';

@Module({
  imports: [],
  controllers: [PromotionController],
  providers: [
    {
      provide: "PROMOTION_REPOSITORY",
      useClass: PromotionRepositoryImpl
    },

    // usecases
      GetAllPromotionsUseCase,
  ],
})
export class PromotionModule {}