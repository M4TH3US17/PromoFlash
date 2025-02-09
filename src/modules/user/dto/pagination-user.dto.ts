import { BasePaginationDTO } from "src/shared/bases/base-pagination.dto";
import { UserEntity } from "../user.entity";

export class UserPaginationDTO extends BasePaginationDTO<UserEntity> {
};