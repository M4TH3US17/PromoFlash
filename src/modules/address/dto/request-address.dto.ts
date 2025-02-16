import { PartialType } from "@nestjs/swagger";

export class CreateAddressRequestDTO {
    street: string;
    number:  number;
    neighborhood: string;
    city: string;
    state: string;
    cep: string;
    country: string;
    complement: string;

    // location: LocationEntity;
};

export class UpdateAddressRequestDTO extends PartialType(CreateAddressRequestDTO) { };