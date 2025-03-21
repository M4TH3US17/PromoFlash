import { HttpStatus } from "@nestjs/common";

export class UseCaseResponseDTO {
    statusCode: HttpStatus;
    message: string;
    data: any
};

export class APIResponseDTO {
    statusCode: HttpStatus;
    message: string;
    data: any
};
