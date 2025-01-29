import { CouponEntity } from "src/modules/coupon/coupon.entity";
import { CreateCouponDTO, UpdateCouponDTO } from "src/modules/coupon/dto/coupon.dto";
import { IBaseRepositoryContract } from "src/shared/bases/Ibase.repository-contract";

export interface ICouponRepositoryContract
    extends IBaseRepositoryContract<
        CouponEntity,
        UpdateCouponDTO,
        CreateCouponDTO
    > {
        
};