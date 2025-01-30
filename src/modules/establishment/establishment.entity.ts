import { BaseEntity } from "src/shared/bases/base.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { ContactEntity } from "../contact/contact.entity";
import { AddressEntity } from "../address/address.entity";
import { EstablishmentProduct } from "../establishments_products/establishments_products.entity";
import { Status } from "src/shared/enums/status";
import { ProductEntity } from "../product/product.entity";

@Entity({
    name: "establishments",
    schema: "product_management",
})
export class EstablishmentEntity extends BaseEntity {

    @Column({ unique: true })
    cnpj: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column({ type: "enum", enum: Status, default: Status.ACTIVE })
    status: Status;

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
    @OneToOne(() => AddressEntity, (address) => address.establishment, { nullable: false })
    address: AddressEntity;

    // @OneToMany(() => EstablishmentProduct, (products) => products.establishment)
    // products: EstablishmentProduct[];
    @OneToMany(() => EstablishmentProduct, (products) => products.pk._establishment)
    _items: EstablishmentProduct[];

    get products(): ProductEntity[] {
        return this._items.map((item: EstablishmentProduct) => item.product);
    };

};