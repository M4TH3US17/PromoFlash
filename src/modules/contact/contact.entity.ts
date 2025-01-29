import { BaseEntity } from "src/shared/bases/base.entity";
import { Entity, OneToOne } from "typeorm";
import { UserEntity } from "../user/user.entity";
import { EstablishmentEntity } from "../establishment/establishment.entity";

@Entity({ 
    schema: "common", 
    name: "contacts"
})
export class ContactEntity extends BaseEntity {

    @OneToOne(() => UserEntity, (user) => user.contact)
    user: UserEntity;

    @OneToOne(() => EstablishmentEntity, (establishment) => establishment.contact)
    establishment: EstablishmentEntity;

};