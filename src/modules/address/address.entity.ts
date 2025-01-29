import { BaseEntity } from "src/shared/bases/base.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "addresses"})
export class AddressEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column(() => BaseEntity)
    base: BaseEntity
};