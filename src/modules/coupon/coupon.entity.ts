import { SCHEMA } from "src/infrastructure/database/enums/schemas";
import { BaseEntity } from "src/shared/bases/base.entity";
import { Status } from "src/shared/enums/status";
import { Column, Entity } from "typeorm";

@Entity({
    schema: SCHEMA.PROMOTION,
    name: "coupons",
})
export class CouponEntity extends BaseEntity {

    @Column({ type: "enum", enum: Status, default: Status.ACTIVE })
    status: Status;

};