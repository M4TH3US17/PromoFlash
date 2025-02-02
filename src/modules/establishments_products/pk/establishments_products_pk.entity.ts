import { EstablishmentEntity } from "src/modules/establishment/establishment.entity";
import { ProductEntity } from "src/modules/product/product.entity";
import { Column, ManyToOne, PrimaryColumn } from "typeorm";

/*
  PK Composta Embbeded
*/
export class EstablishmentProductPK {

  @PrimaryColumn({name: "establishment_fk"})
  establishmentId: number;
  
  @PrimaryColumn({name: "product_fk"})
  productId: number;

  // @Column({ name: "establishment_fk" })
  // @ManyToOne(() => EstablishmentEntity/*, (establishment) => establishment.products,*/, { nullable: false })
  // _establishment: EstablishmentEntity

  // @Column({ name: "product_fk" })
  // @ManyToOne(() => ProductEntity/*, (establishment) => establishment.products,*/, { nullable: false })
  // _product: ProductEntity

  // get establishment(): EstablishmentEntity {
  //   return this._establishment;
  // };

  // set establishment(establishment: EstablishmentEntity) {
  //   this._establishment = establishment;
  // };

  // get product(): ProductEntity {
  //   return this._product;
  // };

  // set product(product: ProductEntity) {
  //   this._product = product;
  // };

};

