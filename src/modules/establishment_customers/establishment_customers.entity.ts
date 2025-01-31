import { Column, CreateDateColumn, Entity } from "typeorm";
import { EstablishmentCustomerPK } from "./pk/establishment_customers.pk.entity";

@Entity({
    schema: "product_management",
    name: "establishments_customers", 
    comment: "Tabela que relaciona estabelecimentos e clientes",
})
export class EstablishmentCustomers {

    @Column(() => EstablishmentCustomerPK)
    pk: EstablishmentCustomerPK;

    @Column({ name: "total_promotions_acquired", default: 0 })
    totalPromotionsAcquired: number;

    @CreateDateColumn({ 
        type: 'timestamp', 
        default: () => 'CURRENT_TIMESTAMP',
        name: "following_since", 
        comment: "Data que o usuário começou a seguir o estabelecimento",
    })
    followingSince: Date;
};