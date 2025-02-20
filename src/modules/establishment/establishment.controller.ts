import { Response } from 'express';
import { Body, Controller, Get, Post, Query, Res, UseFilters, UsePipes } from "@nestjs/common";
import { GetAllEstablishmentsUseCase } from './usecases/get-all-establishments.usecase';
import { UseCaseResponseDTO } from 'src/shared/bases/usecase-response.dto';
import { PaginationParserPipe } from 'src/shared/pipes/pagination-parser.pipe';
import { EstablishmentEntity } from './establishment.entity';
import { CreateEstablishmentsUseCase } from './usecases/create-establishment.usecase';
import { EstablishmentPaginationDTO } from './dto/pagination-establishment.dto';
import { CreateEstablishmentRequestDTO } from './dto/request-establishment.dto';
import { ApiBody, ApiConflictResponse, ApiInternalServerErrorResponse, ApiOperation, ApiProduces } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/config/filters/http-exception.filter';
import { ApiResponse, EndpointType } from 'src/shared/decorators/swagger-pagineted-response.decorator';
import { EstablishmentResponseDTO } from './dto/response-establishment.dto';
import { processError } from 'src/shared/utils/global.utils';

@UseFilters(HttpExceptionFilter)
@Controller({ path: "establishments" })
export class EstablishmentController {

    constructor(
        private readonly getAllEstablishmentsUseCase: GetAllEstablishmentsUseCase,
        private readonly createEstablishmentsUseCase: CreateEstablishmentsUseCase,
    ) { }

    @Get()
    @UsePipes(new PaginationParserPipe(EstablishmentEntity))
    @ApiResponse(EstablishmentResponseDTO, EndpointType.PAGINATION)
    @ApiOperation({ summary: 'Listagem paginada de estabelecimentos' })
    @ApiInternalServerErrorResponse({ description: "Erro interno no servidor" })
    public async getAllAsync(@Res() res: Response, @Query() pagination: EstablishmentPaginationDTO) {
        try {
            const response: UseCaseResponseDTO = await this.getAllEstablishmentsUseCase.executeAsync(pagination);
            return res.status(response.statusCode).json(response);
        } catch (error) {
            processError(error);
        };
    };

    @Post()
    @ApiResponse(EstablishmentResponseDTO, EndpointType.CREATE)
    @ApiBody({ type: CreateEstablishmentRequestDTO })
    @ApiOperation({ summary: 'Cria um estabelecimento na base de dados' })
    @ApiConflictResponse({ description: "Estabelecimento já existente na base de dados" })
    @ApiInternalServerErrorResponse({ description: "Erro interno no servidor" })
    public async createAsync(@Body() req: CreateEstablishmentRequestDTO, @Res() res: Response) {
        try {
            const response: UseCaseResponseDTO = await this.createEstablishmentsUseCase.executeAsync(req);
            return res.status(response.statusCode).json(response);
        } catch (error) {
            processError(error);
        };
    };

};