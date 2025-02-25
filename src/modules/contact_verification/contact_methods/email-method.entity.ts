import { ChildEntity, Column } from "typeorm";
import { ContactVerificationEntity } from "../contact-verification.entity";

@ChildEntity()
export class EmailMethod extends ContactVerificationEntity {

    @Column()
    email: string;

};