import { Body, Controller, HttpStatus, Post, Res } from "@nestjs/common";
import { LoginService } from "./login/login.service";
import { LogoutService } from "./logout/logout.service";
import { RegisterService } from "./register/register.service";
import { Response } from "express";
import { SignInRequestDTO } from "./login/dto/request-signIn.dto";
import { ResponseJsonWebTokenDTO } from "./login/dto/response-jwt.dto";
import { Public } from "./others";

@Controller("auth")
export class AuthenticationController {

    constructor(
        private readonly loginService: LoginService,
        private readonly logoutService: LogoutService,
        private readonly registerService: RegisterService,
    ) {}

    @Public()
    @Post("login")
    public async signIn(
        @Body() request: SignInRequestDTO,
        @Res() res: Response,
    ) {
        const data: ResponseJsonWebTokenDTO = await this.loginService.signIn(request);
        return res.status(HttpStatus.OK).json(data);
    };

};