import { BaseEntity } from "src/shared/bases/base.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "coupons"})
export class CouponEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column(() => BaseEntity)
    base: BaseEntity
};