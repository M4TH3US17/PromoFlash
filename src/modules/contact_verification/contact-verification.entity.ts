import { SCHEMA } from "@infrastructure/database/enums/schemas";
import { ContactEntity } from "@modules/contact/contact.entity";
import { BaseEntity } from "src/shared/bases/base.entity";
import { Column, Entity, OneToOne, TableInheritance } from "typeorm";

@Entity({ schema: SCHEMA.COMMON, name: "contact_verification" })
@TableInheritance({ column: { type: 'varchar', name: 'contact_method' } })
export class ContactVerificationEntity extends BaseEntity {

    @Column({ type: "int", name: "code_verification", nullable: false })
    codeVerification: number;

    @Column({ type: "timestamp", name: "code_expiration", nullable: false })
    codeExpiration: Date;
    
    @Column({ type: "boolean", name: "is_valid", nullable: false })
    isValid: boolean;

    @OneToOne(() => ContactEntity, (contact) => contact.emailContact)
    emailContact?: ContactEntity;

    @OneToOne(() => ContactEntity, (contact) => contact.firstContact)
    firstContact: ContactEntity;

    @OneToOne(() => ContactEntity, (contact) => contact.secondContact)
    secondContact?: ContactEntity;

};