import { BaseEntity } from "src/shared/bases/base.entity";
import { Entity } from "typeorm";

@Entity({
    name: "establishments",
    schema: "product_management"
})
export class EstablishmentEntity extends BaseEntity {

};