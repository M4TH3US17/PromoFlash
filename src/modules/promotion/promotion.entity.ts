import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "promotions"})
export class PromotionEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column(() => BaseEntity)
    base: BaseEntity
};