import { BaseEntity } from "src/shared/bases/base.entity";
import { Column, Entity } from "typeorm";

@Entity({
    name: "products",
    schema: "product_management"
})
export class ProductEntity extends BaseEntity {

    @Column()
    name: string;

    @Column()
    brand: string;

};