import { OmitType, PartialType } from "@nestjs/swagger";
import { CouponEntity } from "../coupon.entity";

export class CreateCouponRequestDTO extends OmitType(CouponEntity, ["createdAt", "updatedAt", "id"]) { };

export class UpdateCouponRequestDTO extends PartialType(CreateCouponRequestDTO) { };