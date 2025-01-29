import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "establishments"})
export class EstablishmentEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column(() => BaseEntity)
    base: BaseEntity
};