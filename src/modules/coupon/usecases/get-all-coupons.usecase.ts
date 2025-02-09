import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { ICouponRepositoryContract } from "src/infrastructure/repository_contracts/Icoupon.repository-contract";
import { UseCaseResponseDTO } from "src/shared/bases/usecase-response.dto";
import { CouponPaginationDTO } from "../dto/pagination-coupon.dto";
import { CouponEntity } from "../coupon.entity";


@Injectable()
export class GetAllCouponsUseCase {

    constructor(
        @Inject("COUPON_REPOSITORY")
        private readonly couponRepository: ICouponRepositoryContract,
    ) { }

    async executeAsync(pagination: CouponPaginationDTO): Promise<UseCaseResponseDTO> {
        try {
            const coupons: CouponEntity[] = await this.couponRepository.getAllAsync(pagination);
            
            return {
                statusCode: HttpStatus.OK,
                message: "",
                data: []
            };
        } catch (error) {
            if (error instanceof HttpException) throw error;
            throw new HttpException("Desculpe, houve um erro interno no servidor. Por favor, catatar o suporte.", HttpStatus.INTERNAL_SERVER_ERROR);
        };
    };

};