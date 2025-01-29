import { Column } from "typeorm"

export abstract class BaseEntity {
    @Column()
    created_at: Date;

    @Column()
    updated_at: Date;
};