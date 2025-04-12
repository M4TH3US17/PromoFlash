import { LocationEntity } from "src/modules/location/location.entity";
import { AddressEntity } from "../address.entity";
import { ResponseAddressDTO } from "./dto/response-address.dto";
import { CreateAddressRequestDTO } from "./dto/create-address.dto";
import { capitalize } from "@shared/utils/global.utils";
import { mapLocationRequestToEntity } from "@modules/location/others/location.utils";

export function mapAddressRequestToEntity(request: CreateAddressRequestDTO): AddressEntity {
    
    // cep: request.cep,
    // city: request.city,
    // number: request.number,
    // state: request.state,
    // street: request.street,
    // country: request.country,
    // complement: request.complement,
    // neighborhood: request.neighborhood,
    return {
        place_id: request.place_id,
        address: request.address,
        description: request.description,
        location: mapLocationRequestToEntity(request.location),
    }
};

export function mapAddressEntityToDTO(entity: AddressEntity): ResponseAddressDTO {
    // country: capitalize(entity.country),
    // cep: entity.cep,
    // city: entity.city.toUpperCase(),
    // state: capitalize(entity.state),
    // street: entity.street,
    // number: entity.number,
    // complement: entity.complement,
    // neighborhood: entity.neighborhood,
    return {
        id: entity.id,
        address: entity.address,
        description: entity.description,
        place_id: entity.place_id,
        location: mapLocationRequestToEntity(entity.location)
    }
}; 