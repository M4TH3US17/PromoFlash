import { Response } from 'express';
import { Controller, Get, Query, Res } from "@nestjs/common";
import { UseCaseResponseDTO } from 'src/shared/bases/usecase-response.dto';
import { GetAllContactsUseCase } from './usecases/get-all-contacts.usecase';
import { PaginationParserPipe } from 'src/shared/pipes/pagination-parser.pipe.';
import { ContactEntity } from './contact.entity';
import { ContactPaginationDTO } from './dto/pagination-contact.dto';

@Controller({path: "contacts"})
export class ContactController {

    constructor(
        private readonly getAllContactsUseCase: GetAllContactsUseCase,
    ) {}

    @Get()
    public async getAll(
        @Res() res: Response,
        @Query(new PaginationParserPipe(ContactEntity)) pagination: ContactPaginationDTO,
    ) {
        const response: UseCaseResponseDTO = await this.getAllContactsUseCase.executeAsync(pagination);
        return res.status(response.statusCode).json(response);
    };

};