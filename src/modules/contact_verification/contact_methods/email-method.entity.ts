import { ChildEntity, Column } from "typeorm";
import { ContactVerificationEntity } from "../contact-verification.entity";

@ChildEntity("email")
export class EmailMethod extends ContactVerificationEntity {

    @Column({ type: "varchar", name: "email" })
    email: string;

};