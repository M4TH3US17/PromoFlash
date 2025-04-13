import { BaseEntity } from "src/shared/bases/base.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { AddressEntity } from "../address/address.entity";
import { PromotionEntity } from "../promotion/promotion.entity";
import { SCHEMA } from "@infrastructure/database/enums/schemas";
import { EstablishmentType } from "./others/enums/establishment-type.enum";
import { AccountStatus } from "@shared/enums/account-status.enum";
import { EmailEntity } from "@modules/contact/email/email.entity";
import { PhoneEntity } from "@modules/contact/phone/phone.entity";
@Entity({
    schema: SCHEMA.PRODUCT,
    name: "establishments",
})
export class EstablishmentEntity extends BaseEntity {

    @Column()
    cnpj: string; 

    @Column()
    name: string;

    @Column({ name: "business_name", comment: "nome fantasia da empresa" })
    businessName: string;

    @Column()
    stars?: number;

    @Column()
    description: string;
    
    // @Column(() => EstablishmentValidationsEntity)
    // validations: EstablishmentValidationsEntity;

    @Column({
        type: "enum",
        enum: AccountStatus,
        default: AccountStatus.PENDING,
        name: "establishment_status",
    })
    establishmentStatus: AccountStatus;


    @Column({
        name: "establishment_validate_status",
        default: 0
    })
    isValid?: number;
    
    @Column({
        type: "enum",
        name: "establishment_type",
        enum: EstablishmentType,
        default: EstablishmentType.HEADQUARTERS,
        comment: "Tipo de estabelecimento, indicando se é a matriz, uma sub-matriz, filial ou uma franquia.",
    })
    establishmentType: EstablishmentType;

    @JoinColumn({ 
        name: "address_fk",
        referencedColumnName: "id",
        foreignKeyConstraintName: "fk_establishment_address",
    })
    @OneToOne(() => AddressEntity, (address) => address.establishment, { nullable: false, cascade: true })
    address: AddressEntity;
    
    @OneToMany(() => PromotionEntity, (promotion) => promotion.establishment)
    promotions?: PromotionEntity[]
    
    @OneToMany(() => PhoneEntity, (phones) => phones.establishment, { cascade: true })
    phones: PhoneEntity[]

    @OneToMany(() => EmailEntity, (emails) => emails.establishment, { cascade: true })
    emails: EmailEntity[]

};