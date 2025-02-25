import { Response } from 'express';
import { Controller, Get, Query, Res, UsePipes } from "@nestjs/common";
import { GetAllUsersUseCase } from './usecases/get-all-users.usecase';
import { UseCaseResponseDTO } from 'src/shared/bases/usecase-response.dto';
import { PaginationParserPipe } from 'src/shared/pipes/pagination-parser.pipe';
import { UserEntity } from './user.entity';
import { UserPaginationDTO } from './others/dto/pagination-user.dto';

@Controller({path: "users"})
export class UserController {

    constructor(
        private readonly getAllUsersUseCase: GetAllUsersUseCase,
    ) { }

    @Get()
    @UsePipes(new PaginationParserPipe(UserEntity))
    public async getAll(
        @Res() res: Response,
        @Query() pagination: UserPaginationDTO,
    ) {
        const response: UseCaseResponseDTO = await this.getAllUsersUseCase.executeAsync(pagination);
        return res.status(response.statusCode).json(response);
    };

};