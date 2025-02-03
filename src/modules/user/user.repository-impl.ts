import { UserEntity } from "./user.entity";
import { CreateUserRequestDTO } from "./dto/create-user.dto";
import { UpdateUserRequestDTO } from "./dto/update-user.dto";
import { IUserRepositoryContract } from "src/infrastructure/repository_contracts/Iuser.repository-contract";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class UserRepositoryImpl implements IUserRepositoryContract {

    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {}

    getAllAsync(): Promise<UserEntity[]> {
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