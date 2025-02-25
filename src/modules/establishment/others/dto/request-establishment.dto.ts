import { ApiProperty, IntersectionType, OmitType, PartialType } from "@nestjs/swagger";
import { CreateAddressRequestDTO } from "@modules/address/others/dto/request-address.dto";
import { CreateContactRequestDTO } from "@modules/contact/others/dto/request-contact.dto";
import { EstablishmentValidationsEntity } from "../embedded_entities/establishment-validations.entity";
import { EstablishmentTypeValues } from "../enums/establishment-type.enum";
import { EstablishmentEntity } from "@modules/establishment/establishment.entity";

export class CreateEstablishmentRequestDTO extends IntersectionType(
    OmitType(EstablishmentEntity, ["createdAt", "updatedAt", "deletedAt", "id", "promotions", "stars", "contact", "address", "validations"]),
    OmitType(EstablishmentValidationsEntity, ["isValid"]),
) {

    @ApiProperty({ type: CreateAddressRequestDTO })
    address: CreateAddressRequestDTO;

    @ApiProperty({ type: CreateContactRequestDTO })
    contact: CreateContactRequestDTO;

    @ApiProperty({ example: "HEADQUARTERS", description: 'valores: "HEADQUARTERS", "SUB_HEADQUARTERS" ou "BRANCH".', })
    establishmentType: EstablishmentTypeValues;
};

export class UpdateEstablishmentRequestDTO extends PartialType(CreateEstablishmentRequestDTO) { };