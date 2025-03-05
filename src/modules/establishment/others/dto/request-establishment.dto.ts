import { ApiProperty, ApiPropertyOptional, IntersectionType, OmitType, PartialType } from "@nestjs/swagger";
import { CreateAddressRequestDTO } from "@modules/address/others/dto/request-address.dto";
import { EstablishmentValidationsEntity } from "../embedded_entities/establishment-validations.entity";
import { EstablishmentTypeValues } from "../enums/establishment-type.enum";
import { EstablishmentEntity } from "@modules/establishment/establishment.entity";
import { CreateEmailContactDTO, CreatePhoneContactDTO } from "@modules/contact_verification/others/dto/request-contact-verification.dto";

export class CreateEstablishmentRequestDTO extends IntersectionType(
    OmitType(EstablishmentEntity, ["createdAt", "updatedAt", "deletedAt", "id", "promotions", "stars", "address", "validations", "secondPhone", "firstPhone", "email"]),
    OmitType(EstablishmentValidationsEntity, ["isValid"]),
) {

    @ApiProperty({ type: CreateAddressRequestDTO })
    address: CreateAddressRequestDTO;

    //@ApiProperty({ type: CreateEmailContactDTO })
    email?: string; //CreateEmailContactDTO;
    
    @ApiProperty({ type: CreatePhoneContactDTO })
    firstPhone: CreatePhoneContactDTO;

    @ApiPropertyOptional({ type: CreatePhoneContactDTO })
    secondPhone?: CreatePhoneContactDTO; 

    @ApiProperty({ example: "HEADQUARTERS", description: 'valores: "HEADQUARTERS", "SUB_HEADQUARTERS" ou "BRANCH".', })
    establishmentType: EstablishmentTypeValues;

};

export class UpdateEstablishmentRequestDTO extends PartialType(CreateEstablishmentRequestDTO) { };