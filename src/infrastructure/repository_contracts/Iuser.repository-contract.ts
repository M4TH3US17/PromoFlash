import { CreateUserRequestDTO, UpdateUserRequestDTO } from "@modules/user/others/dto/request-user.dto";
import { UserEntity } from "src/modules/user/user.entity";
import { IBaseRepositoryContract } from "src/shared/bases/Ibase.repository-contract";

export interface IUserRepositoryContract
    extends IBaseRepositoryContract<
        UpdateUserRequestDTO,
        CreateUserRequestDTO,
        UserEntity
    > {
        
};