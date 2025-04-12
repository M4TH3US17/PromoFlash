import { CreateLocationRequestDTO } from "@modules/location/others/dto/create-location.dto";

export class CreateAddressRequestDTO {
    place_id: string;
    address: string;
    description: string;
    location: CreateLocationRequestDTO;
};