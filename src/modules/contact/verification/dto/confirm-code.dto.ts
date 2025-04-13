import { ContactType } from "../enums/contact-type.enum";
import { TokenType } from "../enums/token-type.enum";

export class ConfirmCodeRequestDTO {
    token: number;
    tokenType: TokenType;
    contactType: ContactType;
};