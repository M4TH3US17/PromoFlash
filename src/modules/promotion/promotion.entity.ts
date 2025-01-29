import { BaseEntity } from "src/shared/bases/base.entity";
import { Entity } from "typeorm";

@Entity({name: "promotions"})
export class PromotionEntity extends BaseEntity {
};