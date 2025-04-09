import { ResponseAddressDTO } from "@modules/address/others/dto/response-address.dto";
import { ResponsePhoneDTO } from "@modules/contact_verification/others/dto/response-phone.dto";
import { ResponseEmailDTO } from "@modules/contact_verification/others/dto/response-email.dto";
import { ResponsePromotionDTO } from "@modules/promotion/others/dto/response-promotion.dto";
import { EstablishmentType } from "../enums/establishment-type.enum";

export class ResponseEstablishmentDTO {
    id: number;
    cnpj: string;
    name: string;
    businessName: string;
    stars: number;
    description: string;
    establishmentType: EstablishmentType;
    address: ResponseAddressDTO;
    promotions: ResponsePromotionDTO[]
    phones: ResponsePhoneDTO[]
    emails: ResponseEmailDTO[]
};