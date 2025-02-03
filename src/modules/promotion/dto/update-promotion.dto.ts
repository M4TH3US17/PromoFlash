import { PartialType } from '@nestjs/mapped-types';
import { CreatePromotionRequestDTO } from './create-promotion.dto';

export class UpdatePromotionRequestDTO extends PartialType(CreatePromotionRequestDTO) { };