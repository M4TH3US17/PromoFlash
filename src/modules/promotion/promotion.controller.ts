import { Response } from 'express';
import { Controller, Get, Res } from "@nestjs/common";
import { GetAllPromotionsUseCase } from './usecases/get-all-promotions.usecase';
import { UseCaseResponseDTO } from 'src/shared/bases/usecase-response.dto';

@Controller({path: "promotions"})
export class PromotionController {

    constructor(
        private readonly getAllPromotionsUseCase: GetAllPromotionsUseCase,
    ) { }

    @Get()
    public async getAll(@Res() res: Response) {
        const response: UseCaseResponseDTO = await this.getAllPromotionsUseCase.executeAsync();
        return res.status(response.statusCode).json(response);
    };

};