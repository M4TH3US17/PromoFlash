import { BaseEntity } from "src/shared/bases/base.entity";
import { Column, Entity } from "typeorm";
import { LocationEntity } from "../location/location.entity";

@Entity({ 
    schema: "common", 
    name: "addresses"
})
export class AddressEntity extends BaseEntity {

    @Column()
    street: string;

    @Column()
    number:  number;

    @Column()
    neighborhood: string;

    @Column()
    city: string;

    @Column()
    state: string;

    @Column()
    cep: string;

    @Column()
    country: string;

    @Column()
    complement: string;

    @Column(() => LocationEntity)
    location: LocationEntity

};