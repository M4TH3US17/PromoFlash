import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { IUserRepositoryContract } from "src/infrastructure/repository_contracts/Iuser.repository-contract";
import { UseCaseResponseDTO } from "src/shared/bases/usecase-response.dto";


@Injectable()
export class GetAllUsersUseCase {

    constructor(
        @Inject("USER_REPOSITORY")
        private readonly usersRepository: IUserRepositoryContract,
    ) { }

    async executeAsync(): Promise<UseCaseResponseDTO> {
        try {

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