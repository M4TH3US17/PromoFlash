import { ResponseAddressDTO } from "@modules/address/others/dto/response-address.dto";
import { UserRole } from "../enums/user-role.enum";
import { ResponsePhoneDTO } from "@modules/contact_verification/others/dto/response-phone.dto";
import { ResponseEmailDTO } from "@modules/contact_verification/others/dto/response-email.dto";
import { ResponseEstablishmentDTO } from "@modules/establishment/others/dto/response-establishment.dto";
import { AccountStatus } from "@shared/enums/account-status.enum";

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