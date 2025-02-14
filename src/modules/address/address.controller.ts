import { Response } from 'express';
import { Controller, Get, Query, Res, UsePipes } from "@nestjs/common";
import { GetAllAddressesUseCase } from "./usecases/get-all-addresses.usecase";
import { UseCaseResponseDTO } from "src/shared/bases/usecase-response.dto";
import { PaginationParserPipe } from 'src/shared/pipes/pagination-parser.pipe';
import { AddressEntity } from './address.entity';
import { AddressPaginationDTO } from './dto/pagination-address.dto';

@Controller({path: "addresses"})
export class AddressController {

    constructor(
        private readonly getAllAddressesUseCase: GetAllAddressesUseCase,
    ) {}

    @Get()
    @UsePipes(new PaginationParserPipe(AddressEntity))
    public async getAll(
        @Res() res: Response,
        @Query() pagination: AddressPaginationDTO,
    ) {
        const response: UseCaseResponseDTO = await this.getAllAddressesUseCase.executeAsync(pagination);
        return res.status(response.statusCode).json(response);
    };

};