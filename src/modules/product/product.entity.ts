import { BaseEntity } from "src/shared/bases/base.entity";
import { Entity } from "typeorm";

@Entity({name: "products"})
export class ProductEntity extends BaseEntity {
};