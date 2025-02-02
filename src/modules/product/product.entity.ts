import { BaseEntity } from "src/shared/bases/base.entity";
import { Status } from "src/shared/enums/status";
import { Column, Entity, OneToMany } from "typeorm";
import { EstablishmentProduct } from "../establishments_products/establishments_products.entity";

@Entity({
    name: "products",
    schema: "product_management"
})
export class ProductEntity extends BaseEntity {

    @Column()
    name: string;

    @Column()
    brand: string;

    @Column({ type: "enum", enum: Status, default: Status.ACTIVE })
    status: Status;

    // @OneToMany(() => EstablishmentProduct, (establishment) => establishment.pk._product)
    // _items: EstablishmentProduct[];

    // get establishments(): EstablishmentProduct[] {
    //     return this._items;
    // };
    
};