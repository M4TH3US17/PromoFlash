import { CouponEntity } from "src/modules/coupon/coupon.entity";
import { CreateCouponRequestDTO, UpdateCouponRequestDTO } from "src/modules/coupon/dto/request-coupon.dto";
import { IBaseRepositoryContract } from "src/shared/bases/Ibase.repository-contract";

export interface ICouponRepositoryContract
    extends IBaseRepositoryContract<
        UpdateCouponRequestDTO,
        CreateCouponRequestDTO,
        CouponEntity
    > {
        
};