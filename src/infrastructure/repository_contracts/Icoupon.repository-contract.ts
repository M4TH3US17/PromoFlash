import { CouponEntity } from "src/modules/coupon/coupon.entity";
import { CreateCouponRequestDTO } from "src/modules/coupon/dto/create-coupon.dto";
import { UpdateCouponRequestDTO } from "src/modules/coupon/dto/update-coupon.dto";
import { IBaseRepositoryContract } from "src/shared/bases/Ibase.repository-contract";

export interface ICouponRepositoryContract
    extends IBaseRepositoryContract<
        UpdateCouponRequestDTO,
        CreateCouponRequestDTO,
        CouponEntity
    > {
        
};