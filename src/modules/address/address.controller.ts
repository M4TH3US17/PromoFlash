import { Response } from 'express';
import { Body, Controller, Delete, Get, 
    Logger, Param, Post, Put, Query, Res, UsePipes } from "@nestjs/common";
import { UseCaseResponseDTO } from "src/shared/bases/usecase-response.dto";
import { PaginationParserPipe } from 'src/shared/pipes/pagination-parser.pipe';
import { AddressEntity } from './address.entity';
import { AddressPaginationDTO } from './dto/pagination-address.dto';
import { GetAllAddressesUseCase } from "./usecases/get-all-addresses.usecase";
import { CreateAddressUseCase } from './usecases/create-address.usecase';
import { GetAddressByIdUseCase } from './usecases/get-address-by-id.usecase';
import { UpdateAddressUseCase } from './usecases/update-address.usecase';
import { CreateAddressRequestDTO, UpdateAddressRequestDTO } from './dto/request-address.dto';
import { SoftDeleteAddressUseCase } from './usecases/soft-delete-address.usecase';
import { ApiConflictResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, 
    ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { processError } from 'src/shared/utils/global.utils';

@Controller({ path: "addresses" })
export class AddressController {
    private logger: Logger = new Logger(AddressController.name);

    constructor(
        private readonly getAllAddressesUseCase: GetAllAddressesUseCase,
        private readonly getAddressByIdUseCase: GetAddressByIdUseCase,
        private readonly createAddressUseCase: CreateAddressUseCase,
        private readonly updateAddressUseCase: UpdateAddressUseCase,
        private readonly softDeleteAddressUseCase: SoftDeleteAddressUseCase,
    ) { }

    @Get()
    @UsePipes(new PaginationParserPipe(AddressEntity))
    @ApiOperation({ summary: 'Listagem paginada de endereços' })
    @ApiOkResponse({ description: "Listagem paginada de endereços retornada com sucesso" })
    @ApiInternalServerErrorResponse({description: "Erro interno no servidor"})
    public async getAllAsync(@Query() pagination: AddressPaginationDTO, @Res() res: Response) {
        try {
            this.logger.log(`[AddressController] Iniciando a busca de endereços com paginação...`);
            const response: UseCaseResponseDTO = await this.getAllAddressesUseCase.executeAsync(pagination);
            return res.status(response.statusCode).json(response);
        } catch (error) {
            processError(error);
        };
    };

    @Get(':id')
    @ApiOperation({ summary: 'Busca endereço por id' })
    @ApiOkResponse({ description: "Busca endereço por id realizada com sucesso" })
    @ApiNotFoundResponse({ description: 'Não foi possível encontrar o endereço com o ID informado.' })
    @ApiInternalServerErrorResponse({description: "Erro interno no servidor"})
    public async getByIdAsync(@Param() id: number, @Res() res: Response) {
        try {
            this.logger.log(`[AddressController] Iniciando a busca de endereço de ID "${id}"...`);
            const response: UseCaseResponseDTO = await this.getAddressByIdUseCase.executeAsync(id);
            return res.status(response.statusCode).json(response);
        } catch (error) {
            processError(error);
        };
    };

    @Post()
    @ApiOperation({ summary: 'Cria um endereço na base de dados' })
    @ApiConflictResponse({description: "Endereço já existente na base de dados"})
    @ApiCreatedResponse({description: "Endereço criado na base de dados com sucesso"})
    @ApiInternalServerErrorResponse({description: "Erro interno no servidor"})
    public async createAsync(@Body() request: CreateAddressRequestDTO, @Res() res: Response) {
        try {
            this.logger.log(`[AddressController] Iniciando persistencia de um novo endereço...`);
            const response: UseCaseResponseDTO = await this.createAddressUseCase.executeAsync(request);
            return res.status(response.statusCode).json(response);
        } catch (error) {
            processError(error);
        };
    };

    @Put(':id')
    @ApiOperation({ summary: 'Atualiza um endereço na base de dados' })
    @ApiOkResponse({ description: "Busca atualizado com sucesso" })
    @ApiNotFoundResponse({ description: 'Não foi possível encontrar o endereço com o ID informado.' })
    @ApiInternalServerErrorResponse({description: "Erro interno no servidor"})
    public async updateAsync(@Param() id: number, @Body() request: UpdateAddressRequestDTO, @Res() res: Response) {
        try {
            this.logger.log(`[AddressController] Iniciando a atualizacao do endereço de ID "${id}"...`);
            const response: UseCaseResponseDTO = await this.updateAddressUseCase.executeAsync(id, request);
            return res.status(response.statusCode).json(response);
        } catch (error) {
            processError(error);
        };
    };

    @Delete(':id')
    @ApiOperation({ summary: 'Realiza soft-delete de um endereço na base de dados' })
    @ApiNoContentResponse({ description: "Endereço deletado com sucesso" })
    @ApiNotFoundResponse({ description: 'Não foi possível encontrar o endereço com o ID informado.' })
    @ApiInternalServerErrorResponse({description: "Erro interno no servidor"})
    public async deleteAsync(@Param() id: number, @Res() res: Response) {
        try {
            this.logger.log(`[AddressController] Iniciando a delecao do endereço de ID "${id}"...`);
            const response: UseCaseResponseDTO = await this.softDeleteAddressUseCase.executeAsync(id);
            return res.status(response.statusCode).json(response);
        } catch (error) {
            processError(error);
        };
    };

};