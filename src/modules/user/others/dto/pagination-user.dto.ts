import { UserEntity } from "@modules/user/user.entity";
import { BasePaginationDTO } from "src/shared/bases/base-pagination.dto";

export class UserPaginationDTO extends BasePaginationDTO<UserEntity> {
};