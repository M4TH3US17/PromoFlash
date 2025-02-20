import { ApiProperty, IntersectionType, OmitType, PartialType } from "@nestjs/swagger";
import { EstablishmentEntity } from "../establishment.entity";
import { EstablishmentAffiliateEntity } from "../others/embbededs/establishment-affiliate.entity";
import { CreateContactRequestDTO } from "src/modules/contact/dto/request-contact.dto";
import { CreateAddressRequestDTO } from "src/modules/address/dto/request-address.dto";

export class CreateEstablishmentRequestDTO extends IntersectionType(
    OmitType(EstablishmentEntity, ["createdAt", "updatedAt", "id", "promotions", "stars", "ifAffiliated", "contact", "address"]),
    OmitType(EstablishmentAffiliateEntity, ["isVerified"]),
) {
    @ApiProperty({ type: CreateAddressRequestDTO })
    address: CreateAddressRequestDTO;
  
    @ApiProperty({ type: CreateContactRequestDTO })
    contact: CreateContactRequestDTO;
};

export class UpdateEstablishmentRequestDTO extends PartialType(CreateEstablishmentRequestDTO) { };