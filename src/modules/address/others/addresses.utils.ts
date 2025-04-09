import { LocationEntity } from "src/modules/location/location.entity";
import { AddressEntity } from "../address.entity";
import { ResponseAddressDTO } from "./dto/response-address.dto";
import { CreateAddressRequestDTO } from "./dto/create-address.dto";
import { capitalize } from "@shared/utils/global.utils";

export function mapAddressRequestToEntity(request: CreateAddressRequestDTO): AddressEntity {
    const location: LocationEntity = new LocationEntity();

    return {
        cep: request.cep,
        city: request.city,
        number: request.number,
        state: request.state,
        street: request.street,
        country: request.country,
        complement: request.complement,
        neighborhood: request.neighborhood,
        location: location,
    }
};

export function mapAddressEntityToDTO(entity: AddressEntity): ResponseAddressDTO {
    return {
        id: entity.id,
        cep: entity.cep,
        city: entity.city.toUpperCase(),
        country: capitalize(entity.country),
        state: capitalize(entity.state),
        street: entity.street,
        number: entity.number,
        complement: entity.complement,
        neighborhood: entity.neighborhood,
    }
}; 