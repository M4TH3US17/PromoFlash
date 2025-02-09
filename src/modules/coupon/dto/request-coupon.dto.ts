import { PartialType } from "@nestjs/mapped-types";

export class CreateCouponRequestDTO { };

export class UpdateCouponRequestDTO extends PartialType(CreateCouponRequestDTO) { };