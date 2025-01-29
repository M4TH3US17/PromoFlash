import { BaseEntity } from "src/shared/bases/base.entity";
import { Entity } from "typeorm";

@Entity({
    name: "promotions",
    schema: "promotion_management"
})
export class PromotionEntity extends BaseEntity {
};