import { Response } from 'express';
import { Body, Controller, Delete, Get, HttpException, HttpStatus, Logger, Param, Post, Put, Query, Res, UsePipes } from "@nestjs/common";
import { GetAllAddressesUseCase } from "./usecases/get-all-addresses.usecase";
import { UseCaseResponseDTO } from "src/shared/bases/usecase-response.dto";
import { PaginationParserPipe } from 'src/shared/pipes/pagination-parser.pipe';
import { AddressEntity } from './address.entity';
import { AddressPaginationDTO } from './dto/pagination-address.dto';
import { CreateAddressUseCase } from './usecases/create-address.usecase';
import { GetAddressByIdUseCase } from './usecases/get-address-by-id.usecase';
import { UpdateAddressUseCase } from './usecases/update-address.usecase';
import { CreateAddressRequestDTO, UpdateAddressRequestDTO } from './dto/request-address.dto';
import { SoftDeleteAddressUseCase } from './usecases/soft-delete-address.usecase';

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
    public async getAllAsync(@Query() pagination: AddressPaginationDTO, @Res() res: Response) {
        try {
            this.logger.log(`[AddressController] Iniciando a busca de endereços com paginação...`);
            const response: UseCaseResponseDTO = await this.getAllAddressesUseCase.executeAsync(pagination);
            return res.status(response.statusCode).json(response);
        } catch (error) {
            this.logger.error(error);
            if (error instanceof HttpException) throw error;
            throw new HttpException("Desculpe, houve um erro interno no servidor. Por favor, catatar o suporte.", HttpStatus.INTERNAL_SERVER_ERROR);
        };
    };

    @Get(':id')
    public async getByIdAsync(@Param() id: number, @Res() res: Response) {
        try {
            this.logger.log(`[AddressController] Iniciando a busca de endereço de ID "${id}"...`);
            const response: UseCaseResponseDTO = await this.getAddressByIdUseCase.executeAsync(id);
            return res.status(response.statusCode).json(response);
        } catch (error) {
            this.logger.error(error);
            if (error instanceof HttpException) throw error;
            throw new HttpException("Desculpe, houve um erro interno no servidor. Por favor, catatar o suporte.", HttpStatus.INTERNAL_SERVER_ERROR);
        };
    };

    @Post()
    public async createAsync(@Body() request: CreateAddressRequestDTO, @Res() res: Response) {
        try {
            this.logger.log(`[AddressController] Iniciando persistencia de um novo endereço...`);
            const response: UseCaseResponseDTO = await this.createAddressUseCase.executeAsync(request);
            return res.status(response.statusCode).json(response);
        } catch (error) {
            this.logger.error(error);
            if (error instanceof HttpException) throw error;
            throw new HttpException("Desculpe, houve um erro interno no servidor. Por favor, catatar o suporte.", HttpStatus.INTERNAL_SERVER_ERROR);
        };
    };

    @Put(':id')
    public async updateAsync(@Param() id: number, @Body() request: UpdateAddressRequestDTO, @Res() res: Response) {
        try {
            this.logger.log(`[AddressController] Iniciando a atualizacao do endereço de ID "${id}"...`);
            const response: UseCaseResponseDTO = await this.updateAddressUseCase.executeAsync(id, request);
            return res.status(response.statusCode).json(response);
        } catch (error) {
            this.logger.error(error);
            if (error instanceof HttpException) throw error;
            throw new HttpException("Desculpe, houve um erro interno no servidor. Por favor, catatar o suporte.", HttpStatus.INTERNAL_SERVER_ERROR);
        };
    };

    @Delete(':id')
    public async deleteAsync(@Param() id: number, @Res() res: Response) {
        try {
            this.logger.log(`[AddressController] Iniciando a delecao do endereço de ID "${id}"...`);
            const response: UseCaseResponseDTO = await this.softDeleteAddressUseCase.executeAsync(id);
            return res.status(response.statusCode).json(response);
        } catch (error) {
            this.logger.error(error);
            if (error instanceof HttpException) throw error;
            throw new HttpException("Desculpe, houve um erro interno no servidor. Por favor, catatar o suporte.", HttpStatus.INTERNAL_SERVER_ERROR);
        };
    };

};