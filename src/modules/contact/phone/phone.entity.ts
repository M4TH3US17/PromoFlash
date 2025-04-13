import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { SCHEMA } from "@infrastructure/database/enums/schemas";
import { BaseEntity } from "@shared/bases/base.entity";
import { UserEntity } from "@modules/user/user.entity";
import { EstablishmentEntity } from "@modules/establishment/establishment.entity";

@Entity({ 
    schema: SCHEMA.COMMON, 
    name: "phones",
})
export class PhoneEntity extends BaseEntity {

    @Column({ name: "country_code", length: 3 })
    countryCode: string;

    @Column({ length: 2 })
    ddd: string;

    @Column({ length: 9 })
    number: string;

    @Column({ name: "confirmed", default: false })
    confirmed: boolean;

    // Notification preference flags
    @Column({ name: "receive_whatsapp_notifications", default: false })
    receiveWhatsappNotifications: boolean;

    @Column({ name: "receive_sms_notifications", default: false })
    receiveSmsNotifications: boolean;

    @Column({ name: "receive_telegram_notifications", default: false })
    receiveTelegramNotifications: boolean;

    @JoinColumn({ 
        name: "user_fk",
        foreignKeyConstraintName: "fk_phone_user",
        referencedColumnName: "id"
    })
    @ManyToOne(() => UserEntity, (user) => user.phones, { cascade: false })
    user?: UserEntity

    @JoinColumn({ 
        name: "establishment_fk",
        foreignKeyConstraintName: "fk_phone_establishment",
        referencedColumnName: "id"
    })
    @ManyToOne(() => EstablishmentEntity, (establishment) => establishment.phones, { cascade: false })
    establishment?: EstablishmentEntity

};