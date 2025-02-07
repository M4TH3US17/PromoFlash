import { BaseEntity } from "src/shared/bases/base.entity";
import { Status } from "src/shared/enums/status";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne } from "typeorm";
import { EstablishmentProduct } from "../establishments_products/establishments_products.entity";
import { EstablishmentEntity } from "../establishment/establishment.entity";
import { SCHEMA } from "src/infrastructure/database/enums/schemas";

@Entity({
    schema: SCHEMA.PROMOTION,
    name: "promotions",
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
        schema: SCHEMA.PROMOTION,
        name: "promotion_products",
        joinColumn: { name: "promotion_fk" },
        inverseJoinColumn: { name: "product_fk" },
    })
    @ManyToMany(() => EstablishmentProduct)
    products: EstablishmentProduct[]

    @JoinColumn({ name: "establishment_fk" })
    @ManyToOne(() => EstablishmentEntity, (establishment) => establishment.promotions, {  })
    establishment: EstablishmentEntity
};