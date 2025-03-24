import { UserEntity } from "@modules/user/user.entity";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LoginService } from "./login/login.service";
import { LogoutService } from "./logout/logout.service";
import { RegisterService } from "./register/register.service";
import { AuthenticationController } from "./authentication.controller";
import { JwtModule } from "@nestjs/jwt";
import "dotenv/config";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            UserEntity,
        ]),
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET_KEY,
            signOptions: { expiresIn: '60s' },
        }),
    ],
    controllers: [
        AuthenticationController,
    ],
    providers: [
        LoginService,
        LogoutService,
        RegisterService,

        //JwtService,
    ],
})
export class AuthenticationModule { }