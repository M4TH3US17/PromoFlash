import { Response } from 'express';
import { Controller, Get, Query, Res, UsePipes } from "@nestjs/common";
import { GetAllProductsUseCase } from './usecases/get-all-products.usecase';
import { UseCaseResponseDTO } from 'src/shared/bases/usecase-response.dto';
import { PaginationParserPipe } from 'src/shared/pipes/pagination-parser.pipe';
import { ProductEntity } from './product.entity';
import { ProductPaginationDTO } from './dto/pagination-product.dto';

@Controller({path: "products"})
export class ProductController {

    constructor(
        private readonly getAllProductsUseCase: GetAllProductsUseCase,
    ) { }

    @Get()
    @UsePipes(new PaginationParserPipe(ProductEntity))
    public async getAll(
        @Res() res: Response,
        @Query() pagination: ProductPaginationDTO,
    ) {
        const response: UseCaseResponseDTO = await this.getAllProductsUseCase.executeAsync(pagination);
        return res.status(response.statusCode).json(response);
    };
    
};