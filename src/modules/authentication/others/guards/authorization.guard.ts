import {
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import "dotenv/config";
import { IS_PUBLIC_KEY } from '../authentication-consts';

@Injectable()
export class AuthorizationGuard implements CanActivate {

    constructor(
        private readonly jwtServices: JwtService,
        private readonly reflector: Reflector,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
                context.getHandler(),
                context.getClass(),
            ]);

            if (isPublic) return true;

            const request = context.switchToHttp().getRequest();
            const token: string = this.extractTokenFromHeader(request);

            if (!token) {
                throw new HttpException(`Acesso negado. Usuário não autenticado.`, HttpStatus.FORBIDDEN);
            };

            const payload = await this.jwtServices.verifyAsync(token, { secret: process.env.JWT_SECRET_KEY });
            request.user = payload;

            return true
        } catch (error) {
            console.log(error)
            throw new HttpException(`Acesso negado. Houve erro no processamento da solicitação.`, HttpStatus.FORBIDDEN);
        }
    };

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }

}