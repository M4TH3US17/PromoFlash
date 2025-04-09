import { CreateAddressRequestDTO } from "@modules/address/others/dto/create-address.dto";
import { CreateEmailRequestDTO } from "@modules/contact_verification/others/dto/create-email.dto";
import { CreatePhoneRequestDTO } from "@modules/contact_verification/others/dto/create-phone.dto";

export class CreateUserRequestDTO {
    username: string;
    password: string;
    addresses: CreateAddressRequestDTO[];
    phones: CreatePhoneRequestDTO[];
    emails: CreateEmailRequestDTO[];
}