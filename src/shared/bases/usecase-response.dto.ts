import { HttpStatus } from "@nestjs/common";

export class UseCaseResponseDTO {
    statusCode: number;
    message: string;
    data: any
};