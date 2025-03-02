import { BaseEntity } from "src/shared/bases/base.entity";
import { Entity, JoinColumn, OneToOne } from "typeorm";
import { UserEntity } from "../user/user.entity";
import { EstablishmentEntity } from "../establishment/establishment.entity";
import { SCHEMA } from "src/infrastructure/database/enums/schemas";
import { ContactVerificationEntity } from "../contact_verification/contact-verification.entity";

@Entity({ 
    schema: SCHEMA.COMMON,
    name: "contacts",
})
export class ContactEntity extends BaseEntity {
    
    @OneToOne(() => UserEntity, (user) => user.contact)
    user: UserEntity;
    
    @OneToOne(() => EstablishmentEntity, (establishment) => establishment.contact)
    establishment: EstablishmentEntity;
    
    @JoinColumn({
        name: "email_contact_fk",
        foreignKeyConstraintName: "fk_contact_email_veri",
        referencedColumnName: "id"
    })
    @OneToOne(() => ContactVerificationEntity, { cascade: true })
    emailContact?: ContactVerificationEntity;
    
    @JoinColumn({
        name: "first_contact_fk",
        foreignKeyConstraintName: "fk_contact_phone_1_veri",
        referencedColumnName: "id"
    })
    @OneToOne(() => ContactVerificationEntity, { cascade: true })
    firstContact: ContactVerificationEntity;
    
    @JoinColumn({
        name: "second_contacts_fk",
        foreignKeyConstraintName: "fk_contact_phone_2_veri",
        referencedColumnName: "id"
    })
    @OneToOne(() => ContactVerificationEntity, { cascade: true })
    secondContact?: ContactVerificationEntity;
    
};