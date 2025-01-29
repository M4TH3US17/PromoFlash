import { BaseEntity } from "src/shared/bases/base.entity";
import { Column, Entity } from "typeorm";
import { UserRole } from "./enums/user.enums";

@Entity({ 
    schema: "user_management", 
    name: "users"
})
export class UserEntity extends BaseEntity {

    @Column({ type: "enum", enum: UserRole, default: UserRole.USER })
    role: UserRole;

};