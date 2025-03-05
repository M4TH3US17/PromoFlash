import { BaseEntity } from "src/shared/bases/base.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { AddressEntity } from "../address/address.entity";
import { PromotionEntity } from "../promotion/promotion.entity";
import { SCHEMA } from "@infrastructure/database/enums/schemas";
import { EstablishmentValidationsEntity } from "./others";
import { EstablishmentType, EstablishmentTypeValues } from "./others/enums/establishment-type.enum";
import { ApiHideProperty } from "@nestjs/swagger";
import { ContactVerificationEntity } from "@modules/contact_verification/contact-verification.entity";

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
    stars: number;

    @Column()
    description: string;
    
    @ApiHideProperty()
    @Column(() => EstablishmentValidationsEntity)
    validations: EstablishmentValidationsEntity;

    @Column({
        type: "enum",
        enum: Object.values(EstablishmentType),
        default: EstablishmentType.HEADQUARTERS,
        comment: "Tipo de estabelecimento, indicando se é a matriz, uma sub-matriz, filial ou uma franquia.",
    })
    establishmentType: EstablishmentTypeValues;

    
    @JoinColumn({
        name: "address_fk",
        foreignKeyConstraintName: "fk_establishment_address",
    })
    @OneToOne(() => AddressEntity, (address) => address.establishment, { nullable: false, cascade: true })
    address: AddressEntity;
    
    @OneToMany(() => PromotionEntity, (promotion) => promotion.establishment)
    promotions: PromotionEntity[]
    
    // Meios de contato
    @JoinColumn({
        name: "first_phone_fk",
        referencedColumnName: "id",
        foreignKeyConstraintName: "fk_establi_contact1",
    })
    @OneToOne(() => ContactVerificationEntity, { cascade: true })
    firstPhone: ContactVerificationEntity;
    
    @JoinColumn({
        name: "second_phone_fk",
        referencedColumnName: "id",
        foreignKeyConstraintName: "fk_establi_contact2",
    })
    @OneToOne(() => ContactVerificationEntity, { cascade: true })
    secondPhone: ContactVerificationEntity;
    
    @JoinColumn({
        name: "email_fk",
        referencedColumnName: "id",
        foreignKeyConstraintName: "fk_establi_contact3",
    })
    @OneToOne(() => ContactVerificationEntity, { cascade: true })
    email: ContactVerificationEntity;

};
// @OneToMany(() => EstablishmentProduct, (products) => products.establishment)
// products: EstablishmentProduct[];

// @OneToMany(() => EstablishmentProduct, (products) => products.pk._establishment, { cascade: true })
// _items: EstablishmentProduct[];

// get products(): ProductEntity[] {
    //     return this._items.map((item: EstablishmentProduct) => item.product);
    // };