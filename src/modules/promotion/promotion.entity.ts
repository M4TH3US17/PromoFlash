import { BaseEntity } from "src/shared/bases/base.entity";
import { Status } from "src/shared/enums/status";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from "typeorm";
import { EstablishmentEntity } from "../establishment/establishment.entity";
import { EstablishmentProduct } from "../establishments_products/establishments_products.entity";

@Entity({
    name: "promotions",
    schema: "promotion_management"
})
export class PromotionEntity extends BaseEntity {

    @Column({ nullable: false })
    title: string;

    @Column({ nullable: false })
    description: string;

    @Column({ type: "enum", enum: Status, default: Status.ACTIVE })
    status: Status;

    // cupons ?

    @JoinTable({
        schema: "promotion_management",
        name: "promotion_products",
        joinColumn: { name: "promotion_fk" },
        inverseJoinColumn: { name: "product_fk" },
    })
    @ManyToMany(() => EstablishmentProduct)
    products: EstablishmentProduct[]

    @Column({ name: "establishment_fk" })
    @ManyToOne(() => EstablishmentEntity, (establishment) => establishment.promotions)
    establishment: EstablishmentEntity
};