import { ResponseAddressDTO } from "@modules/address/others/dto/response-address.dto";
import { UserRole } from "../enums/user-role.enum";
import { ResponseEstablishmentDTO } from "@modules/establishment/others/dto/response-establishment.dto";
import { AccountStatus } from "@shared/enums/account-status.enum";
import { ResponsePhoneDTO } from "@modules/contact/phone/dto/response-phone.dto";
import { ResponseEmailDTO } from "@modules/contact/email/dto/response-email.dto";

export class ResponseUserDTO {
    //role: UserRole;
    id: number;
    username: string;
    accountStatus: AccountStatus;
    addresses: ResponseAddressDTO[];
    phones: ResponsePhoneDTO[]
    emails: ResponseEmailDTO[]
    followingEstablishments: ResponseEstablishmentDTO[]
};