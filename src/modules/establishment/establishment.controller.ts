import { Response } from 'express';
import { Body, Controller, Get, HttpException, HttpStatus, Post, Query, Res, UseFilters, UsePipes } from "@nestjs/common";
import { GetAllEstablishmentsUseCase } from './usecases/get-all-establishments.usecase';
import { APIResponseDTO, UseCaseResponseDTO } from 'src/shared/bases/usecase-response.dto';
import { PaginationParserPipe } from 'src/shared/pipes/pagination-parser.pipe';
import { EstablishmentEntity } from './establishment.entity';
import { ApiBody, ApiConflictResponse, ApiInternalServerErrorResponse, ApiOperation, ApiProduces } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/config/filters/http-exception.filter';
import { ApiResponse, EndpointType } from 'src/shared/decorators/swagger-pagineted-response.decorator';
import { EstablishmentPaginationDTO } from './others/dto/pagination-establishment.dto';
import { CreateEstablishmentRequestDTO } from './others/dto/create-establishment.dto';
import { EstablishmentService } from './establishment.service';
import { ResponseEstablishmentDTO } from './others/dto/response-establishment.dto';

@UseFilters(HttpExceptionFilter)
@Controller({ path: "establishments" })
export class EstablishmentController {

    constructor(
        private readonly getAllEstablishmentsUseCase: GetAllEstablishmentsUseCase,
        private readonly service: EstablishmentService,
    ) { }

    @Get()
    @UsePipes(new PaginationParserPipe(EstablishmentEntity))
    @ApiResponse(ResponseEstablishmentDTO, EndpointType.PAGINATION)
    @ApiOperation({ summary: 'Listagem paginada de estabelecimentos' })
    @ApiInternalServerErrorResponse({ description: "Erro interno no servidor" })
    public async getAllAsync(@Res() res: Response, @Query() pagination: EstablishmentPaginationDTO) {
        try {
            const data: ResponseEstablishmentDTO[] = await this.service.getAll(pagination);
            return res.status(HttpStatus.OK).json({ message: `Segue os dados da listagem paginada de estabelecimentos`, data });
        } catch (error) {
            console.error(error)
            throw new HttpException("Houve um erro interno no servidor!", HttpStatus.INTERNAL_SERVER_ERROR);
        };
    };

    @Post()
    @ApiResponse(APIResponseDTO, EndpointType.CREATE)
    @ApiBody({ type: CreateEstablishmentRequestDTO })
    @ApiOperation({ summary: 'Cria um estabelecimento na base de dados' })
    @ApiConflictResponse({ description: "Estabelecimento já existente na base de dados" })
    @ApiInternalServerErrorResponse({ description: "Erro interno no servidor" })
    public async createAsync(@Body() req: CreateEstablishmentRequestDTO, @Res() res: Response) {
        try {
            const data: ResponseEstablishmentDTO = await this.service.create(req);
            return res.status(HttpStatus.CREATED).json({ message: `Estabelecimento criado com sucesso!`, data });
        } catch (error) {
            console.error(error)
            throw new HttpException("Houve um erro interno no servidor!", HttpStatus.INTERNAL_SERVER_ERROR);
        };
    };

};