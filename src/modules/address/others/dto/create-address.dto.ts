import { CreateLocationRequestDTO } from "@modules/location/others/dto/create-location.dto";
import { ApiProperty } from "@nestjs/swagger";

export class CreateAddressRequestDTO {

    @ApiProperty({
        required: true,
        example: "ChIJN1t_tDeuEmsRUsoyG83frY4",
        description: "Identificador único e estável para um lugar na base de dados do Google"
    })
    place_id: string;

    @ApiProperty({ 
        required: true,
        example: "Av. Paulista, 1000 - Bela Vista, São Paulo - SP, 01310-000, Brasil",
        description: "Coordenadas do seu endereço" 
    })
    address: string;

    @ApiProperty({
        example: "Av. Paulista, São Paulo - SP, Brasil",
        description: "O nome do local ou descrição" 
    })
    description: string;

    @ApiProperty({
        required: true,
        description: "Coordenadas do seu endereço"
    })
    location: CreateLocationRequestDTO;
};