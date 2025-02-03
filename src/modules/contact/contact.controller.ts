import { Response } from 'express';
import { Controller, Get, Res } from "@nestjs/common";
import { UseCaseResponseDTO } from 'src/shared/bases/usecase-response.dto';
import { GetAllContactsUseCase } from './usecases/get-all-contacts.usecase';

@Controller({path: "contacts"})
export class ContactController {

    constructor(
        private readonly getAllContactsUseCase: GetAllContactsUseCase,
    ) {}

    @Get()
    public async getAll(@Res() res: Response) {
        const response: UseCaseResponseDTO = await this.getAllContactsUseCase.executeAsync();
        return res.status(response.statusCode).json(response);
    };

};