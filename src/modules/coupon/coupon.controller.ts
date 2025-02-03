import { Response } from 'express';
import { Controller, Get, Res } from "@nestjs/common";
import { GetAllCouponsUseCase } from './usecases/get-all-coupons.usecase';
import { UseCaseResponseDTO } from 'src/shared/bases/usecase-response.dto';

@Controller({path: "coupons"})
export class CouponController {

    constructor(
        private readonly getAllCouponsUseCase: GetAllCouponsUseCase,
    ) {}

    @Get()
    public async getAll(@Res() res: Response) {
        const response: UseCaseResponseDTO = await this.getAllCouponsUseCase.executeAsync();
        return res.status(response.statusCode).json(response);
    };

}