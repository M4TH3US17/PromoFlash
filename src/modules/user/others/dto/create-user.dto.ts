import { CreateAddressRequestDTO } from "@modules/address/others/dto/create-address.dto";
import { CreatePhoneRequestDTO } from "@modules/contact_verification/others/dto/create-phone.dto";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserRequestDTO {

    @ApiProperty({ example: "Matheus Washington", required: true, description: "Username do usuário" })
    username: string;

    @ApiProperty({ example: "123", required: true, description: "Senha do usuário" })
    password: string;

    @ApiProperty({ example: "matheusdalvino50@gmail.com", description: "Seu emmail" })
    email: string;

    @ApiProperty({ required: true, description: "Seu contato" })
    phone: CreatePhoneRequestDTO;

    @ApiProperty({ description: "Seu endereço" })
    address: CreateAddressRequestDTO;
    
};