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
import { VenomWhatsappService } from '@infrastructure/external_services/venom/venom.service';
import { ApiBody } from '@nestjs/swagger';

@Controller({path: "users"})
export class UserController {

    constructor(
        private readonly service: UserService,
        private readonly whatsappService: VenomWhatsappService
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

    @Post('send')
    @ApiBody({
        type: 'object',
        schema: {
          example: {
            to: '5511999999999',
            message: 'Olá, esta é uma mensagem de teste'
          },
          required: ['to', 'message'],
          properties: {
            to: {
              type: 'string',
              description: 'Número de telefone no formato internacional (ex: 5511999999999)',
              example: '5511999999999'
            },
            message: {
              type: 'string',
              description: 'Texto da mensagem a ser enviada',
              example: 'Olá, como vai você?'
            }
          }
        }
      })
    async sendMessage(@Body() body: { to: string; message: string }) {
      return this.whatsappService.sendMessage(body.to, body.message);
    }


};