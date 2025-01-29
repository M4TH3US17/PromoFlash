import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "products"})
export class ProductEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column(() => BaseEntity)
    base: BaseEntity
};