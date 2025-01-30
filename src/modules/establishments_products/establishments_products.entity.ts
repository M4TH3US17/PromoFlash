import { Column, Entity, ManyToOne } from "typeorm";
import { EstablishmentProductPK } from "./pk/establishments_products_pk.entity";
import { ProductCategory } from "../product/enums/product.enums";
import { EstablishmentEntity } from "../establishment/establishment.entity";
import { Status } from "src/shared/enums/status";
import { ProductEntity } from "../product/product.entity";

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

    @Column()
    description: string;

    @Column({ type: "enum", enum: ProductCategory })
    category: ProductCategory;

    @Column({ type: "enum", enum: Status, default: Status.ACTIVE })
    status: Status;

    constructor(
        product: ProductEntity, establishment: EstablishmentEntity, price: number, description: string, category: ProductCategory, status: Status,
    ) {
        this.pk.product = product;
        this.pk.establishment = establishment;

        this.price = price;
        this.category = category;
        this.status = status;
        this.description = description;
    }

    public get product(): ProductEntity {
        return this.pk.product
    };

    public get establishment(): EstablishmentEntity {
        return this.pk.establishment
    };

    public set product(product: ProductEntity) {
        this.pk.product = product;
    };

    public set establishment(establishment: EstablishmentEntity) {
        this.pk.establishment = establishment;
    };

    // @Column({ 
    //     name: "establishment_fk", 
    //     foreignKeyConstraintName: "fk_products_establishments",
    // })
    // @ManyToOne(() => EstablishmentEntity, (establishment) => establishment.products, { nullable: false })
    // establishment: EstablishmentEntity
    
};