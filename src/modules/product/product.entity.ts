import { BaseEntity } from "src/shared/bases/base.entity";
import { Column, Entity } from "typeorm";
import { ProductCategory } from "./enums/product.enums";

@Entity({
    name: "products",
    schema: "product_management"
})
export class ProductEntity extends BaseEntity {

    @Column({ type: "enum", enum: ProductCategory, nullable: false })
    role: ProductCategory;

};