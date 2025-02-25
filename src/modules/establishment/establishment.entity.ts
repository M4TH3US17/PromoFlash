import { BaseEntity } from "src/shared/bases/base.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { ContactEntity } from "../contact/contact.entity";
import { AddressEntity } from "../address/address.entity";
import { PromotionEntity } from "../promotion/promotion.entity";
import { SCHEMA } from "@infrastructure/database/enums/schemas";
import { EstablishmentValidationsEntity } from "./others";
import { EstablishmentType, EstablishmentTypeValues } from "./others/enums/establishment-type.enum";
import { ApiHideProperty } from "@nestjs/swagger";

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
        name: "contact_fk",
        foreignKeyConstraintName: "fk_establishment_contact",
    })
    @OneToOne(() => ContactEntity, (contact) => contact.establishment, { nullable: false, cascade: true })
    contact: ContactEntity;

    @JoinColumn({
        name: "address_fk",
        foreignKeyConstraintName: "fk_establishment_address",
    })
    @OneToOne(() => AddressEntity, (address) => address.establishment, { nullable: false, cascade: true })
    address: AddressEntity;

    @OneToMany(() => PromotionEntity, (promotion) => promotion.establishment)
    promotions: PromotionEntity[]

};
// @OneToMany(() => EstablishmentProduct, (products) => products.establishment)
// products: EstablishmentProduct[];

// @OneToMany(() => EstablishmentProduct, (products) => products.pk._establishment, { cascade: true })
// _items: EstablishmentProduct[];

// get products(): ProductEntity[] {
//     return this._items.map((item: EstablishmentProduct) => item.product);
// };