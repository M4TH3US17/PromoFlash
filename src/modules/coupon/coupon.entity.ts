import { BaseEntity } from "src/shared/bases/base.entity";
import { Entity } from "typeorm";

@Entity({name: "coupons"})
export class CouponEntity extends BaseEntity {

};