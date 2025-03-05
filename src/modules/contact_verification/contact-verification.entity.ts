import { SCHEMA } from "@infrastructure/database/enums/schemas";
import { EstablishmentEntity } from "@modules/establishment/establishment.entity";
import { UserEntity } from "@modules/user/user.entity";
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
    
    // 1. Relações com estabelecimento
    @OneToOne(() => EstablishmentEntity, (establishment) => establishment.firstPhone)
    establishmentfirstPhone: EstablishmentEntity;
    
    @OneToOne(() => EstablishmentEntity, (establishment) => establishment.secondPhone)
    establishmentSecondPhone?: EstablishmentEntity;
    
    @OneToOne(() => EstablishmentEntity, (establishment) => establishment.email)
    establishmentEmail?: EstablishmentEntity;

    // 2. Relações com usuário
    @OneToOne(() => UserEntity, (user) => user.phone)
    userPhone: UserEntity;

    @OneToOne(() => UserEntity, (user) => user.email)
    userEmail: UserEntity;
    
};
