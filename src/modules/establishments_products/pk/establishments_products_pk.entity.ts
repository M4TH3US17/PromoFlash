import { PrimaryColumn } from "typeorm";

export class EstablishmentProductPK {

    @PrimaryColumn({name: "establishment_fk"})
    establishmentId: number;
  
    @PrimaryColumn({name: "product_fk"})
    productId: number;

  };
  