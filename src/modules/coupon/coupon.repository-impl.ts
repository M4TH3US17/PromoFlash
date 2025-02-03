import { CouponEntity } from "./coupon.entity";
import { CreateCouponRequestDTO } from "./dto/create-coupon.dto";
import { UpdateCouponRequestDTO } from "./dto/update-coupon.dto";
import { ICouponRepositoryContract } from "src/infrastructure/repository_contracts/Icoupon.repository-contract";

export class CouponRepositoryImpl implements ICouponRepositoryContract {

    getAllAsync(): Promise<CouponEntity[]> {
        throw new Error("Method not implemented.");
    };

    getByIdAsync(id: number): Promise<CouponEntity> {
        throw new Error("Method not implemented.");
    };

    createAsync(entityToCreate: CreateCouponRequestDTO): Promise<CouponEntity> {
        throw new Error("Method not implemented.");
    };

    updateAsync(id: number, entityToUpdate: UpdateCouponRequestDTO): Promise<CouponEntity> {
        throw new Error("Method not implemented.");
    };

    deleteAsync(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    };

};