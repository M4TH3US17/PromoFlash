import { Response } from 'express';
import { Controller, Get, Res } from "@nestjs/common";
import { GetAllProductsUseCase } from './usecases/get-all-products.usecase';
import { UseCaseResponseDTO } from 'src/shared/bases/usecase-response.dto';

@Controller({path: "products"})
export class ProductController {

    constructor(
        private readonly getAllProductsUseCase: GetAllProductsUseCase,
    ) { }

    @Get()
    public async getAll(@Res() res: Response) {
        const response: UseCaseResponseDTO = await this.getAllProductsUseCase.executeAsync();
        return res.status(response.statusCode).json(response);
    };
    
};