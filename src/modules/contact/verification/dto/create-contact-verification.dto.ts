import { ContactType } from "../enums/contact-type.enum";

export class CreateContactVerificationRequestDTO {
    token: number;
    contactId: number;
    contactType: ContactType;
};