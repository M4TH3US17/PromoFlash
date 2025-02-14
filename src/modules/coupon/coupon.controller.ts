import { Response } from 'express';
import { Controller, Get, Query, Res, UsePipes } from "@nestjs/common";
import { GetAllCouponsUseCase } from './usecases/get-all-coupons.usecase';
import { UseCaseResponseDTO } from 'src/shared/bases/usecase-response.dto';
import { PaginationParserPipe } from 'src/shared/pipes/pagination-parser.pipe';
import { CouponEntity } from './coupon.entity';
import { CouponPaginationDTO } from './dto/pagination-coupon.dto';

@Controller({path: "coupons"})
export class CouponController {

    constructor(
        private readonly getAllCouponsUseCase: GetAllCouponsUseCase,
    ) {}

    @Get()
    @UsePipes(new PaginationParserPipe(CouponEntity))
    public async getAll(
        @Res() res: Response,
        @Query() pagination: CouponPaginationDTO,
    ) {
        const response: UseCaseResponseDTO = await this.getAllCouponsUseCase.executeAsync(pagination);
        return res.status(response.statusCode).json(response);
    };

}