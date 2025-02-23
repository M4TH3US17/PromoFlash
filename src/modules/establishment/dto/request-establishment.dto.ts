import { ApiProperty, IntersectionType, OmitType, PartialType } from "@nestjs/swagger";
import { EstablishmentEntity } from "../establishment.entity";
import { CreateContactRequestDTO } from "src/modules/contact/dto/request-contact.dto";
import { CreateAddressRequestDTO } from "src/modules/address/dto/request-address.dto";
import { EstablishmentValidationsEntity } from "../others";
import { EstablishmentTypeValues } from "../others/enums/establishment-type.enum";

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