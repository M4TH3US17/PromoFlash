import { CreateAddressRequestDTO } from "@modules/address/others/dto/create-address.dto";
import { EstablishmentType } from "../enums/establishment-type.enum";
import { CreatePhoneRequestDTO } from "@modules/contact/phone/dto/create-phone.dto";
import { CreateEmailRequestDTO } from "@modules/contact/email/dto/create-email.dto";

export class CreateEstablishmentRequestDTO {
    cnpj: string;
    name: string;
    businessName: string;
    description: string;
    establishmentType: EstablishmentType;
    address: CreateAddressRequestDTO;
    phones: CreatePhoneRequestDTO[]
    emails: CreateEmailRequestDTO[]
};


// @ApiProperty({ type: CreateAddressRequestDTO })
// address: CreateAddressRequestDTO;

//@ApiProperty({ type: CreateEmailContactDTO })
// email?: string; //CreateEmailContactDTO;

// @ApiProperty({ type: CreatePhoneContactDTO })
// firstPhone: CreatePhoneContactDTO;

// @ApiPropertyOptional({ type: CreatePhoneContactDTO })
// secondPhone?: CreatePhoneContactDTO;

// @ApiProperty({ example: "HEADQUARTERS", description: 'valores: "HEADQUARTERS", "SUB_HEADQUARTERS" ou "BRANCH".', })
// establishmentType: EstablishmentTypeValues;