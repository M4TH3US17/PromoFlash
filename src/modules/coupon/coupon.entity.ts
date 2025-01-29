import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "coupons"})
export class CouponEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column(() => BaseEntity)
    base: BaseEntity
};