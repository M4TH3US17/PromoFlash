import { Response } from 'express';
import { Controller, Get, Res } from "@nestjs/common";
import { GetAllUsersUseCase } from './usecases/get-all-users.usecase';
import { UseCaseResponseDTO } from 'src/shared/bases/usecase-response.dto';

@Controller({path: "users"})
export class UserController {

    constructor(
        private readonly getAllUsersUseCase: GetAllUsersUseCase,
    ) { }

    @Get()
    public async getAll(@Res() res: Response) {
        const response: UseCaseResponseDTO = await this.getAllUsersUseCase.executeAsync();
        return res.status(response.statusCode).json(response);
    };

};