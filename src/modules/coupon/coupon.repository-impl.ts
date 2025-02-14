import { Injectable } from "@nestjs/common";
import { CouponEntity } from "./coupon.entity";
import { ICouponRepositoryContract } from "src/infrastructure/repository_contracts/Icoupon.repository-contract";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateCouponRequestDTO, UpdateCouponRequestDTO } from "./dto/request-coupon.dto";
import { PaginatedList } from "src/shared/types/pagination.types";

@Injectable()
export class CouponRepositoryImpl implements ICouponRepositoryContract {

    constructor(
        @InjectRepository(CouponEntity)
        private readonly couponRepository: Repository<CouponEntity>,
    ) {}

    getAllAsync(): Promise<PaginatedList<CouponEntity>> {
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