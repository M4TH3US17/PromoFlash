import { CreateUserRequestDTO } from "src/modules/user/dto/create-user.dto";
import { UpdateUserRequestDTO } from "src/modules/user/dto/update-user.dto";
import { UserEntity } from "src/modules/user/user.entity";
import { IBaseRepositoryContract } from "src/shared/bases/Ibase.repository-contract";

export interface IUserRepositoryContract
    extends IBaseRepositoryContract<
        UpdateUserRequestDTO,
        CreateUserRequestDTO,
        UserEntity
    > {
        
};