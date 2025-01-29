import { CreateUserDTO, UpdateUserDTO } from "src/modules/user/dto/user.dto";
import { UserEntity } from "src/modules/user/user.entity";
import { IBaseRepositoryContract } from "src/shared/bases/Ibase.repository-contract";

export interface IUserRepositoryContract
    extends IBaseRepositoryContract<
        UserEntity,
        UpdateUserDTO,
        CreateUserDTO
    > {
        
};