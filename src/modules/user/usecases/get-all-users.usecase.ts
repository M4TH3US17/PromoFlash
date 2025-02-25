import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { IUserRepositoryContract } from "src/infrastructure/repository_contracts/Iuser.repository-contract";
import { UseCaseResponseDTO } from "src/shared/bases/usecase-response.dto";
import { UserEntity } from "../user.entity";
import { PaginatedList } from "src/shared/types/pagination.types";
import { UserPaginationDTO } from "../others/dto/pagination-user.dto";


@Injectable()
export class GetAllUsersUseCase {

    constructor(
        @Inject("USER_REPOSITORY")
        private readonly usersRepository: IUserRepositoryContract,
    ) { }

    async executeAsync(pagination: UserPaginationDTO): Promise<UseCaseResponseDTO> {
        try {
            const users: PaginatedList<UserEntity> = await this.usersRepository.getAllAsync(pagination);

            return {
                statusCode: HttpStatus.OK,
                message: "",
                data: []
            };
        } catch (error) {
            if (error instanceof HttpException) throw error;
            throw new HttpException("Desculpe, houve um erro interno no servidor. Por favor, catatar o suporte.", HttpStatus.INTERNAL_SERVER_ERROR);
        };
    };

};