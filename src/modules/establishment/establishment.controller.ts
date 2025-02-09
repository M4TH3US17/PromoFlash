import { Response } from 'express';
import { Controller, Get, Query, Res } from "@nestjs/common";
import { GetAllEstablishmentsUseCase } from './usecases/get-all-establishments.usecase';
import { UseCaseResponseDTO } from 'src/shared/bases/usecase-response.dto';
import { PaginationParserPipe } from 'src/shared/pipes/pagination-parser.pipe.';
import { EstablishmentEntity } from './establishment.entity';
import { EstablishmentPaginationDTO } from './dto/pagination-establishment.dto';

@Controller({ path: "establishments" })
export class EstablishmentController {

    constructor(
        private readonly getAllEstablishmentsUseCase: GetAllEstablishmentsUseCase,
    ) { }

    @Get()
    public async getAll(
        @Res() res: Response,
        @Query(new PaginationParserPipe(EstablishmentEntity)) pagination: EstablishmentPaginationDTO,
    ) {
        const response: UseCaseResponseDTO = await this.getAllEstablishmentsUseCase.executeAsync(pagination);
        return res.status(response.statusCode).json(response);
    };

};