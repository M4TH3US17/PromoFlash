import { PartialType } from '@nestjs/mapped-types';
import { CreateCouponRequestDTO } from './create-coupon.dto';

export class UpdateCouponRequestDTO extends PartialType(CreateCouponRequestDTO) { };