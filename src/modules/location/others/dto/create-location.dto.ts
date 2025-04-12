import { ApiProperty } from "@nestjs/swagger";

export class CreateLocationRequestDTO {

    @ApiProperty({ required: true, example: -23.5635 })
    latitude: number;

    @ApiProperty({ required: true, example: -46.6540 })
    longitude: number;

};