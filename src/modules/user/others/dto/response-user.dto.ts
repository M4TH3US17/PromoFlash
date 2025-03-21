import { ResponseAddressDTO } from "@modules/address/others/dto/response-address.dto";
import { UserRole } from "../enums/user.enums";
import { ResponsePhoneDTO } from "@modules/contact_verification/others/dto/response-phone.dto";
import { ResponseEmailDTO } from "@modules/contact_verification/others/dto/response-email.dto";
import { ResponseEstablishmentDTO } from "@modules/establishment/others/dto/response-establishment.dto";

export class ResponseUserDTO {
    id: number;
    username: string;
    role: UserRole;
    addresses: ResponseAddressDTO[];
    phones: ResponsePhoneDTO[]
    emails: ResponseEmailDTO[]
    followingEstablishments: ResponseEstablishmentDTO[]
};