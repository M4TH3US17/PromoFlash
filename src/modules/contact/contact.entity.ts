import { BaseEntity } from "src/shared/bases/base.entity";
import { Column, Entity, OneToOne } from "typeorm";
import { UserEntity } from "../user/user.entity";
import { EstablishmentEntity } from "../establishment/establishment.entity";
import { SCHEMA } from "src/infrastructure/database/enums/schemas";

@Entity({ 
    schema: SCHEMA.COMMON,
    name: "contacts",
})
export class ContactEntity extends BaseEntity {

    @Column()
    email: string;

    @Column({ name: "first_contact", nullable: false })
    firstContact: string;

    @Column({ name: "second_contact" })
    secondContact: string;

    @OneToOne(() => UserEntity, (user) => user.contact)
    user: UserEntity;

    @OneToOne(() => EstablishmentEntity, (establishment) => establishment.contact)
    establishment: EstablishmentEntity;

};