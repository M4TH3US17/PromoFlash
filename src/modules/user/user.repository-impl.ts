import { IUserRepositoryContract } from "src/infrastructure/repository_contracts/Iuser.repository-contract";
import { CreateUserDTO, UpdateUserDTO } from "./dto/user.dto";
import { UserEntity } from "./user.entity";

class UserRepositoryImpl implements IUserRepositoryContract {

    getAll(): Promise<UserEntity[]> {
        throw new Error("Method not implemented.");
    };

    getById(id: number): Promise<UserEntity> {
        throw new Error("Method not implemented.");
    };

    create(entityToCreate: CreateUserDTO): Promise<UserEntity> {
        throw new Error("Method not implemented.");
    };

    update(id: number, entityToUpdate: UpdateUserDTO): Promise<UserEntity> {
        throw new Error("Method not implemented.");
    };

    delete(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    };

};