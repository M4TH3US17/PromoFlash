import { LocationEntity } from "../location.entity"
import { CreateLocationRequestDTO } from "./dto/create-location.dto"
import { ResponseLocationDTO } from "./dto/response-location.dto"

export function mapLocationRequestToEntity(request: CreateLocationRequestDTO): LocationEntity {
    if (!request)
        return null;

    return {
        latitude: request.latitude,
        longitude: request.longitude
    }
};

export function mapLocationEntityToDTO(entity: LocationEntity): ResponseLocationDTO {
    return {
        latitude: entity.latitude,
        longitude: entity.longitude,
    }
};