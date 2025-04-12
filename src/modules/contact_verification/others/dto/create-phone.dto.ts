import { ApiProperty } from "@nestjs/swagger";

export class CreatePhoneRequestDTO {

    @ApiProperty({ example: "92", required: true, description: "DDD do estado" })
    ddd: string;

    @ApiProperty({ example: "+55", required: true, description: "Código do país +1, +55, etc" })
    countryCode: string;

    @ApiProperty({ example: "986067356", required: true, description: "Número de contato" })
    number: string;

};