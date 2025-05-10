import { Column, Entity, ManyToMany } from "typeorm";
import { EstablishmentProductPK } from "./pk/establishments_products_pk.entity";
import { ProductCategory } from "../product/others/enums/product.enums";
import { Status } from "src/shared/enums/status";
import { PromotionEntity } from "../promotion/promotion.entity";
import { SCHEMA } from "src/infrastructure/database/enums/schemas";

@Entity({ 
    schema: SCHEMA.PRODUCT,
    name: "establishments_products", 
    comment: "Tabela que relaciona estabelecimentos e produtos",
})
export class EstablishmentProduct {
    
    @Column(() => EstablishmentProductPK)
    pk: EstablishmentProductPK;

    @Column()
    price: number;

    @Column()
    description: string;

    @Column()
    stars: number;

    @Column({ type: "enum", enum: ProductCategory })
    category: ProductCategory;
    
    @Column({ type: "enum", enum: Status, default: Status.ACTIVE })
    status: Status;
    
    @ManyToMany(() => PromotionEntity, (promotion) => promotion.products, { cascade: false })
    promotions: PromotionEntity[];
    
};