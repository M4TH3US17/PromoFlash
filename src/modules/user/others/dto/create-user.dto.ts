import { CreateAddressRequestDTO } from "@modules/address/others/dto/create-address.dto";
import { CreatePhoneRequestDTO } from "@modules/contact_verification/others/dto/create-phone.dto";

export class CreateUserRequestDTO {
    username: string;
    password: string;
    address: CreateAddressRequestDTO;
    phone: CreatePhoneRequestDTO;
    email: string;
}