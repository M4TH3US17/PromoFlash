import { Response } from 'express';
import { Controller, Get, Res } from "@nestjs/common";
import { GetAllEstablishmentsUseCase } from './usecases/get-all-establishments.usecase';
import { UseCaseResponseDTO } from 'src/shared/bases/usecase-response.dto';

@Controller({ path: "establishments" })
export class EstablishmentController {

    constructor(
        private readonly getAllEstablishmentsUseCase: GetAllEstablishmentsUseCase,
    ) { }

    @Get()
    public async getAll(@Res() res: Response) {
        const response: UseCaseResponseDTO = await this.getAllEstablishmentsUseCase.executeAsync();
        return res.status(response.statusCode).json(response);
    };

};