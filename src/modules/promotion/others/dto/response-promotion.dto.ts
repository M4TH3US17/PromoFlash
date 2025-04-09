import { PromotionEntity } from '@modules/promotion/promotion.entity';
import { OmitType } from '@nestjs/swagger';

export class ResponsePromotionDTO {
    id: number;
    title: string;
    description: string;
}