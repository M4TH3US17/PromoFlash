import { AddressEntity } from "@modules/address/address.entity";
import { OmitType, PartialType } from "@nestjs/swagger";

export class CreateAddressRequestDTO extends OmitType(AddressEntity, 
    ["id", "createdAt", "updatedAt", "location", "establishment", "users", "deletedAt"]) {
};

export class UpdateAddressRequestDTO extends PartialType(CreateAddressRequestDTO) { };