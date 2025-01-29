import { BaseEntity } from "src/shared/bases/base.entity";
import { Entity, JoinColumn, OneToOne } from "typeorm";
import { ContactEntity } from "../contact/contact.entity";
import { AddressEntity } from "../address/address.entity";
import { EstablishmentProduct } from "../establishments_products/establishments_products.entity";

@Entity({
    name: "establishments",
    schema: "product_management"
})
export class EstablishmentEntity extends BaseEntity {

    products: EstablishmentProduct[];

    @JoinColumn({
        name: "establishment_fk",
        foreignKeyConstraintName: "fk_establishment_contact",
    })
    @OneToOne(() => ContactEntity, (contact) => contact.establishment, { nullable: false })
    contact: ContactEntity;
    
    @JoinColumn({
        name: "address_fk",
        foreignKeyConstraintName: "fk_establishment_address",
    })
    @OneToOne(() => AddressEntity, (address) => address.establishment, { nullable: false })
    address: AddressEntity;

};