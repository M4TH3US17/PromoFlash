import { Response } from 'express';
import { Controller, Get, Query, Res, UsePipes } from "@nestjs/common";
import { UseCaseResponseDTO } from 'src/shared/bases/usecase-response.dto';
import { GetAllContactsUseCase } from './usecases/get-all-contacts.usecase';
import { PaginationParserPipe } from 'src/shared/pipes/pagination-parser.pipe';
import { ContactEntity } from './contact.entity';
import { ContactPaginationDTO } from './others/dto/pagination-contact.dto';

@Controller({path: "contacts"})
export class ContactController {

    constructor(
        private readonly getAllContactsUseCase: GetAllContactsUseCase,
    ) {}

    @Get()
    @UsePipes(new PaginationParserPipe(ContactEntity))
    public async getAll(
        @Res() res: Response,
        @Query() pagination: ContactPaginationDTO,
    ) {
        const response: UseCaseResponseDTO = await this.getAllContactsUseCase.executeAsync(pagination);
        return res.status(response.statusCode).json(response);
    };

};