import { ChildEntity, Column } from "typeorm";
import { ContactVerificationEntity } from "../contact-verification.entity";

@ChildEntity("phone")
export class PhoneMethod extends ContactVerificationEntity {

    @Column({ name: "country_code", length: 3 })
    countryCode: string;

    @Column({ length: 2 })
    ddd: string;

    @Column({ length: 9 })
    number: string;

    getFullPhoneNumber(): string {
        return `${this.countryCode} (${this.ddd}) ${this.number}`;
    };

};