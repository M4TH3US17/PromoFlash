import { BaseEntity } from "src/shared/bases/base.entity";
import { Column, Entity, ManyToMany, ManyToOne, OneToOne } from "typeorm";
import { LocationEntity } from "../location/location.entity";
import { UserEntity } from "../user/user.entity";
import { EstablishmentEntity } from "../establishment/establishment.entity";
import { SCHEMA } from "src/infrastructure/database/enums/schemas";

@Entity({
    schema: SCHEMA.COMMON,
    name: "addresses"
})
export class AddressEntity extends BaseEntity {
    
    @Column()
    place_id: string;
    
    @Column()
    address: string;
    
    @Column()
    description: string;
    
    @Column(() => LocationEntity)
    location: LocationEntity;
    
    @ManyToMany(() => UserEntity, (user) => user.addresses)
    users?: UserEntity[];
    
    @OneToOne(() => EstablishmentEntity, (establishment) => establishment.address)
    establishment?: EstablishmentEntity;
    
};

// @Column()
// street: string;

// @Column()
// number:  number;

// @Column()
// neighborhood: string;

// @Column()
// city: string;

// @Column()
// state: string;

// @Column()
// cep: string;

// @Column()
// country: string;

// @Column()
// complement: string;