import { ResponseLocationDTO } from "@modules/location/others/dto/response-location.dto";

export class ResponseAddressDTO {
    id: number;
    place_id: string;
    address: string;
    description: string;
    location: ResponseLocationDTO;
};