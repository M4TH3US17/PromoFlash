import { PartialType } from "@nestjs/swagger";

export class CreateCouponRequestDTO { };

export class UpdateCouponRequestDTO extends PartialType(CreateCouponRequestDTO) { };