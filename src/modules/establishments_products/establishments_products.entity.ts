import { Column, Entity, ManyToOne } from "typeorm";
import { EstablishmentProductPK } from "./pk/establishments_products_pk.entity";
import { ProductCategory } from "../product/enums/product.enums";
import { EstablishmentEntity } from "../establishment/establishment.entity";
import { Status } from "src/shared/enums/status";

@Entity({ 
    schema: "product_management",
    name: "establishments_products", 
    comment: "Tabela que relaciona estabelecimentos e produtos",
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

    @Column({ type: "enum", enum: Status, default: Status.ACTIVE })
    status: Status;

    @Column({ 
        name: "establishment_fk", 
        foreignKeyConstraintName: "fk_products_establishments",
    })
    @ManyToOne(() => EstablishmentEntity, (establishment) => establishment.products, { nullable: false })
    establishment: EstablishmentEntity
    
};