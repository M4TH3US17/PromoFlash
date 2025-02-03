import { HttpStatus } from "@nestjs/common";

export class UseaseResponseDTO {
    statusCode: HttpStatus;
    message: string;
    data: any
};