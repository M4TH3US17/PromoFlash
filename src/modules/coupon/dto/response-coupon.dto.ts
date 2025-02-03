import { OmitType } from "@nestjs/mapped-types";
import { CouponEntity } from "../coupon.entity";

export class CouponResponseDTO extends OmitType(CouponEntity, [] as const) {}