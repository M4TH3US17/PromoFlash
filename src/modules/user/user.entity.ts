import { BaseEntity } from "src/shared/bases/base.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne } from "typeorm";
import { UserRole } from "./others/enums/user-role.enum";
import { AddressEntity } from "../address/address.entity";
import { EstablishmentEntity } from "../establishment/establishment.entity";
import { SCHEMA } from "src/infrastructure/database/enums/schemas";
import { AccountStatus } from "../../shared/enums/account-status.enum";
import { ContactVerificationEntity } from "@modules/contact/verification/verification.entity";
import { EmailEntity } from "@modules/contact/email/email.entity";
import { PhoneEntity } from "@modules/contact/phone/phone.entity";

@Entity({
    schema: SCHEMA.USER,
    name: "users",
})
export class UserEntity extends BaseEntity {

    @Column()
    username: string;

    @Column()
    password: string;

    @Column({ type: "enum", enum: UserRole, default: UserRole.USER })
    role: UserRole;

    @Column({
        type: "enum",
        enum: AccountStatus,
        default: AccountStatus.PENDING,
        name: "account_status",
    })
    accountStatus: AccountStatus;

    @JoinTable({
        schema: SCHEMA.USER,
        name: "user_addresses",
        joinColumn: { name: "user_fk" },
        inverseJoinColumn: { name: "address_fk" },
    })
    @ManyToMany(() => AddressEntity, { cascade: true })
    addresses: AddressEntity[];

    @OneToMany(() => ContactVerificationEntity, (contactToken) => contactToken.user, { cascade: true })
    contactTokens?: ContactVerificationEntity[]

    @OneToMany(() => PhoneEntity, (phones) => phones.user, { cascade: true })
    phones: PhoneEntity[]

    @OneToMany(() => EmailEntity, (emails) => emails.user, { cascade: true })
    emails: EmailEntity[]

    @JoinTable({
        schema: SCHEMA.USER,
        name: "user_establishments",
        joinColumn: { name: "user_fk" },
        inverseJoinColumn: { name: "establishments_fk" },
    })
    @ManyToMany(() => EstablishmentEntity)
    followingEstablishments?: EstablishmentEntity[]
};