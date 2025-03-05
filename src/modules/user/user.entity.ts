import { BaseEntity } from "src/shared/bases/base.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne } from "typeorm";
import { UserRole } from "./others/enums/user.enums";
import { AddressEntity } from "../address/address.entity";
import { Status } from "src/shared/enums/status";
import { EstablishmentEntity } from "../establishment/establishment.entity";
import { SCHEMA } from "src/infrastructure/database/enums/schemas";
import { Exclude } from "class-transformer";
import { ContactVerificationEntity } from "@modules/contact_verification/contact-verification.entity";

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

   // @Column({ type: "enum", enum: Status, default: Status.ACTIVE })
   // status: Status;
    
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
        foreignKeyConstraintName: "fk_user_contact1"
    })
    @OneToOne(() => ContactVerificationEntity, (contact) => contact.userPhone)
    phone: ContactVerificationEntity;

    @JoinColumn({ 
        name: "contact_fk",
        foreignKeyConstraintName: "fk_user_contact2"
    })
    @OneToOne(() => ContactVerificationEntity, (contact) => contact.userEmail)
    email: ContactVerificationEntity;

    @JoinTable({
        schema: SCHEMA.USER,
        name: "user_establishments",
        joinColumn: { name: "user_fk" },
        inverseJoinColumn: { name: "establishments_fk" },
    })
    @ManyToMany(() => EstablishmentEntity)
    followingEstablishments: EstablishmentEntity[]
};