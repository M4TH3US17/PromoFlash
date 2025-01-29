import { Column, Entity } from "typeorm";
import { EstablishmentProductPK } from "./pk/establishments_products_pk.entity";
import { ProductCategory } from "../product/enums/product.enums";

@Entity({ 
    schema: "product_management",
    name: "establishments_products", 
})
export class EstablishmentProduct {
    
    @Column(() => EstablishmentProductPK)
    pk: EstablishmentProductPK;

    @Column()
    price: number;

    // @Column()
    // description: string;

    @Column({ type: "enum", enum: ProductCategory })
    category: ProductCategory;
    
};