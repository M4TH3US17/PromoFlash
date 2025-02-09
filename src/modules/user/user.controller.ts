import { Response } from 'express';
import { Controller, Get, Query, Res } from "@nestjs/common";
import { GetAllUsersUseCase } from './usecases/get-all-users.usecase';
import { UseCaseResponseDTO } from 'src/shared/bases/usecase-response.dto';
import { PaginationParserPipe } from 'src/shared/pipes/pagination-parser.pipe.';
import { UserEntity } from './user.entity';
import { UserPaginationDTO } from './dto/pagination-user.dto';

@Controller({path: "users"})
export class UserController {

    constructor(
        private readonly getAllUsersUseCase: GetAllUsersUseCase,
    ) { }

    @Get()
    public async getAll(
        @Res() res: Response,
        @Query(new PaginationParserPipe(UserEntity)) pagination: UserPaginationDTO,
    ) {
        const response: UseCaseResponseDTO = await this.getAllUsersUseCase.executeAsync(pagination);
        return res.status(response.statusCode).json(response);
    };

};