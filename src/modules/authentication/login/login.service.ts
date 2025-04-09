import { UserEntity } from "@modules/user/user.entity";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Raw, Repository } from "typeorm";
import { SignInRequestDTO } from "./dto/request-signIn.dto";
import { capitalize } from "@shared/utils/global.utils";
import { ResponseJsonWebTokenDTO } from "./dto/response-jwt.dto";
import { JwtService } from "@nestjs/jwt";
import { comparePassword } from "../authentication.utils";

@Injectable()
export class LoginService {

    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        private readonly jwtService: JwtService,
    ) { }

    async signIn(request: SignInRequestDTO): Promise<ResponseJsonWebTokenDTO> {
        const user: UserEntity = await this.userRepository.findOne({
            where: { username: Raw(alias => `REPLACE(LOWER(${alias}), ' ', '') = REPLACE(LOWER(:username), ' ', '')`, { username: request.username }) }
        });

        const isPasswordCorrect: boolean = await comparePassword(request.password, user?.password);
        
        if (!isPasswordCorrect)
            throw new HttpException(`Credenciais inválidas para usuário de username "${request.username}"`, HttpStatus.UNAUTHORIZED);

        const tokenJWT: string = await this.jwtService.signAsync({
            id: user.id,
            username: capitalize(user.username),
            role: user.role,
        });

        return {
            token: tokenJWT,
        }
    };

};