import { LocationEntity } from "src/modules/location/location.entity";
import { AddressEntity } from "../address.entity";
import { CreateAddressRequestDTO } from "../dto/request-address.dto";
import { AddressResponseDTO } from "../dto/response-address.dto";

export function parseAddressRequestToEntity(request: CreateAddressRequestDTO): AddressEntity {
    const location: LocationEntity = new LocationEntity();

    return {
        id: null,
        cep: request.cep,
        city: request.city,
        number: request.number,
        state: request.state,
        street: request.street,
        country: request.country,
        complement: request.complement,
        neighborhood: request.neighborhood,
        users: null,
        establishment: null,
        location: location,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
    }
};

export function parseAddressEntityToResponse(entity: AddressEntity): AddressResponseDTO {
    return {
        id: entity.id,
        cep: entity.cep,
        city: entity.city,
        country: entity.country,
        state: entity.state,
        street: entity.street,
        number: entity.number,
        complement: entity.complement,
        neighborhood: entity.neighborhood,

    }
}; 