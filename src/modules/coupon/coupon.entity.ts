import { BaseEntity } from "src/shared/bases/base.entity";
import { Entity } from "typeorm";

@Entity({
    name: "coupons",
    schema: "promotion_management"
})
export class CouponEntity extends BaseEntity {

};