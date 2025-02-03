import { Response } from 'express';
import { Controller, Get, Res } from "@nestjs/common";
import { GetAllAddressesUseCase } from "./usecases/get-all-addresses.usecase";
import { UseCaseResponseDTO } from "src/shared/bases/usecase-response.dto";

@Controller({path: "addresses"})
export class AddressController {

    constructor(
        private readonly getAllAddressesUseCase: GetAllAddressesUseCase,
    ) {}

    @Get()
    public async getAll(@Res() res: Response) {
        const response: UseCaseResponseDTO = await this.getAllAddressesUseCase.executeAsync();
        return res.status(response.statusCode).json(response);
    };

};