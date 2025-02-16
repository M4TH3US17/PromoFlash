import { OmitType, PartialType } from "@nestjs/swagger";
import { AddressEntity } from "../address.entity";

export class CreateAddressRequestDTO extends OmitType(AddressEntity, 
    ["id", "createdAt", "updatedAt", "location", "establishment", "users"]) {
};

export class UpdateAddressRequestDTO extends PartialType(CreateAddressRequestDTO) { };