import { OmitType } from '@nestjs/swagger';
import { CouponEntity } from "../coupon.entity";

export class CouponResponseDTO extends OmitType(CouponEntity, [] as const) {}