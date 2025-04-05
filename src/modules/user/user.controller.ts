import { Response } from 'express';
import { Body, Controller, Get, HttpException, HttpStatus, Post, Query, Res, UsePipes } from "@nestjs/common";
import { UserService } from './user.service';
import { ResponseUserDTO } from './others/dto/response-user.dto';
import { CreateUserRequestDTO } from './others/dto/create-user.dto';
import { PaginationParserPipe } from '@shared/pipes/pagination-parser.pipe';
import { UserEntity } from './user.entity';
import { UserPaginationDTO } from './others/dto/pagination-user.dto';
import { UseCaseResponseDTO } from '@shared/bases/usecase-response.dto';
import { PaginatedList } from '@shared/types/pagination.types';
import { Roles } from '@modules/authentication/others';
import { UserRole } from './others/enums/user-role.enum';

@Controller({path: "users"})
export class UserController {

    constructor(
        private readonly service: UserService,
    ) { }

    @Get()
    @UsePipes(new PaginationParserPipe(UserEntity))
    public async getAll(
        @Res() res: Response,
        @Query() pagination: UserPaginationDTO,
    ) {
        const data: ResponseUserDTO[] = await this.service.getAll(pagination);
        return res.status(HttpStatus.OK).json({
            message: "Segue a lista de usuários",
            data: data
        });
    };

    @Post()
    public async create(@Body() request: CreateUserRequestDTO, @Res() res: Response) {
        try {
            const data: ResponseUserDTO = await this.service.create(request);
            return res.status(HttpStatus.CREATED).json({
                message: `Usuário criado com sucesso!`,
                data: data
            });
        } catch(error) {
            console.log(error)
            throw new HttpException("Houve um erro interno no servidor!", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    };


};