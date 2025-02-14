import { Response } from 'express';
import { Controller, Get, Query, Res, UsePipes } from "@nestjs/common";
import { GetAllPromotionsUseCase } from './usecases/get-all-promotions.usecase';
import { UseCaseResponseDTO } from 'src/shared/bases/usecase-response.dto';
import { PaginationParserPipe } from 'src/shared/pipes/pagination-parser.pipe';
import { PromotionEntity } from './promotion.entity';
import { PromotionPaginationDTO } from './dto/pagination-promotion.dto';

@Controller({path: "promotions"})
export class PromotionController {

    constructor(
        private readonly getAllPromotionsUseCase: GetAllPromotionsUseCase,
    ) { }

    @Get()
    @UsePipes(new PaginationParserPipe(PromotionEntity))
    public async getAll(
        @Res() res: Response,
        @Query() pagination: PromotionPaginationDTO,
    ) {
        const response: UseCaseResponseDTO = await this.getAllPromotionsUseCase.executeAsync(pagination);
        return res.status(response.statusCode).json(response);
    };

};