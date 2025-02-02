import { PrimaryColumn } from "typeorm";

export class EstablishmentCustomerPK {

    @PrimaryColumn({ name: "user_fk", nullable: false })
    userId: number;

    @PrimaryColumn({ name: "establishment_fk", nullable: false })
    establishmentId: number;

};