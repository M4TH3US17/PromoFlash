import { UserEntity } from "./user.entity";
import { IUserRepositoryContract } from "src/infrastructure/repository_contracts/Iuser.repository-contract";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PaginatedList } from "src/shared/types/pagination.types";
import { CreateUserRequestDTO, UpdateUserRequestDTO } from "./others/dto/request-user.dto";

@Injectable()
export class UserRepositoryImpl implements IUserRepositoryContract {

    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {}

    async getAllAsync(): Promise<PaginatedList<UserEntity>> {
        throw new Error("Method not implemented.");
    };

    getByIdAsync(id: number): Promise<UserEntity> {
        throw new Error("Method not implemented.");
    };

    createAsync(entityToCreate: CreateUserRequestDTO): Promise<UserEntity> {
        throw new Error("Method not implemented.");
    };

    updateAsync(id: number, entityToUpdate: UpdateUserRequestDTO): Promise<UserEntity> {
        throw new Error("Method not implemented.");
    };

    deleteAsync(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    };

};