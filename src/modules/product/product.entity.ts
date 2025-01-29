import { BaseEntity } from "src/shared/bases/base.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "products"})
export class ProductEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column(() => BaseEntity)
    base: BaseEntity
};