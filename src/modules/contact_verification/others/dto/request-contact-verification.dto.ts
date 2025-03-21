import { ContactType } from "../enums/contact-type.enum";
import { OwnerType } from "../enums/owner-type.enum";
import { TokenType } from "../enums/token-type.enum";

export class ContactVerificationRequestDTO {
    token: number;
    contactId: number;
    contactType: ContactType;
};