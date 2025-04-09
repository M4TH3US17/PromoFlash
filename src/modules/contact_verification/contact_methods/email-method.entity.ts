import { Column, Entity, JoinColumn, ManyToOne, } from "typeorm";
import { SCHEMA } from "@infrastructure/database/enums/schemas";
import { BaseEntity } from "@shared/bases/base.entity";
import { UserEntity } from "@modules/user/user.entity";
import { EstablishmentEntity } from "@modules/establishment/establishment.entity";

@Entity({ 
    schema: SCHEMA.COMMON, 
    name: "emails",
})
export class EmailEntity extends BaseEntity {

    @Column({ type: "varchar", name: "email" })
    email: string;

    @Column({ name: "confirmed", default: false })
    confirmed: boolean;

    // Notification preference flags
    @Column({ name: "receive_email_notifications", default: false })
    receiveEmailNotifications: boolean;

    @JoinColumn({ 
        name: "user_fk",
        foreignKeyConstraintName: "fk_email_user",
        referencedColumnName: "id"
    })
    @ManyToOne(() => UserEntity, (user) => user.emails)
    user?: UserEntity


    @JoinColumn({ 
        name: "establishment_fk",
        foreignKeyConstraintName: "fk_email_establishment",
        referencedColumnName: "id"
    })
    @ManyToOne(() => EstablishmentEntity, (establishment) => establishment.emails, { cascade: false })
    establishment?: EstablishmentEntity

};