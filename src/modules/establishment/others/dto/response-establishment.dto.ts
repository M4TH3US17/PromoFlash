import { ResponseAddressDTO } from "@modules/address/others/dto/response-address.dto";
import { ResponsePromotionDTO } from "@modules/promotion/others/dto/response-promotion.dto";
import { EstablishmentType } from "../enums/establishment-type.enum";
import { ResponsePhoneDTO } from "@modules/contact/phone/dto/response-phone.dto";
import { ResponseEmailDTO } from "@modules/contact/email/dto/response-email.dto";

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