import { BaseEntity } from "src/shared/bases/base.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { LocationEntity } from "../location/location.entity";

@Entity({name: "addresses"})
export class AddressEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column(() => LocationEntity)
    location: LocationEntity

    @Column(() => BaseEntity)
    base: BaseEntity
};