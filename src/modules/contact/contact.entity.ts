import { BaseEntity } from "src/shared/bases/base.entity";
import { Entity } from "typeorm";

@Entity({ 
    schema: "common", 
    name: "contacts"
})
export class ContactEntity extends BaseEntity {

};