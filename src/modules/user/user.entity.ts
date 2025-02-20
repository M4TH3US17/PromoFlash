import { BaseEntity } from "src/shared/bases/base.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne } from "typeorm";
import { UserRole } from "./enums/user.enums";
import { ContactEntity } from "../contact/contact.entity";
import { AddressEntity } from "../address/address.entity";
import { Status } from "src/shared/enums/status";
import { EstablishmentEntity } from "../establishment/establishment.entity";
import { SCHEMA } from "src/infrastructure/database/enums/schemas";
import { Exclude } from "class-transformer";

@Entity({ 
    schema: SCHEMA.USER, 
    name: "users",
})
export class UserEntity extends BaseEntity {

    @Column()
    username: string;

    @Exclude()
    @Column()
    password: string;

    @Column({ type: "enum", enum: UserRole, default: UserRole.USER })
    role: UserRole;

    @Column({ type: "enum", enum: Status, default: Status.ACTIVE })
    status: Status;
    
    @JoinTable({
        schema: SCHEMA.USER,
        name: "user_addresses",
        joinColumn: { name: "user_fk" },
        inverseJoinColumn: { name: "address_fk" },
    })
    @ManyToMany(() => AddressEntity)
    address: AddressEntity[];

    @JoinColumn({ 
        name: "contact_fk",
        foreignKeyConstraintName: "fk_user_contact"
    })
    @OneToOne(() => ContactEntity, (contact) => contact.user)
    contact: ContactEntity;

    @JoinTable({
        schema: SCHEMA.USER,
        name: "user_establishments",
        joinColumn: { name: "user_fk" },
        inverseJoinColumn: { name: "establishments_fk" },
    })
    @ManyToMany(() => EstablishmentEntity)
    followingEstablishments: EstablishmentEntity[]
};