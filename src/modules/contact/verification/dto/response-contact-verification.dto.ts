import { ContactType } from "../enums/contact-type.enum";
import { TokenType } from "../enums/token-type.enum";

export class ResponseContactVerificationDTO {
    id: number;
    tokenType: TokenType;
    contactType: ContactType;
};