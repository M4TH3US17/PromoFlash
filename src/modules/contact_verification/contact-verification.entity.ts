import { SCHEMA } from "@infrastructure/database/enums/schemas";
import { BaseEntity } from "src/shared/bases/base.entity";
import { Column, Entity, JoinColumn, ManyToOne, } from "typeorm";
import { ContactType } from "./others/enums/contact-type.enum";
import { OwnerType } from "./others/enums/owner-type.enum";
import { TokenType } from "./others/enums/token-type.enum";
import { UserEntity } from "@modules/user/user.entity";

@Entity({ 
    schema: SCHEMA.COMMON, 
    name: "contact_verification",
})
export class ContactVerificationEntity extends BaseEntity {

    @Column({ type: "int", name: "token", nullable: false })
    token: number;

    @Column({ type: "timestamp", name: "expired_at", nullable: false })
    expired_at: Date;

    @Column({ type: "timestamp", name: "used_at", nullable: true })
    used_at: Date;

    @Column({ type: "enum", enum: ContactType, default: ContactType.SMS })
    contact_type: ContactType;

    @Column({ type: "enum", enum: OwnerType, default: OwnerType.ESTABLISHMENT })
    owner_type: OwnerType;

    @Column({ type: "enum", enum: TokenType, default: TokenType.CONFIRMATION })
    token_type: TokenType;
    
    @JoinColumn({
        name: "user_fk",
        referencedColumnName: "id",
        foreignKeyConstraintName: "fk_contact_veri_user"
    })
    @ManyToOne(() => UserEntity, (user) => user.contactTokens)
    user: UserEntity
    
};