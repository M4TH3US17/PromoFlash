import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { Roles } from '../decorators/roles.decorator';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from '../authentication-consts';
import "dotenv/config";
import { UserRole } from '@modules/user/others/enums/user-role.enum';

@Injectable()
export class RolesGuard implements CanActivate {

    constructor(
        private readonly jwtServices: JwtService,
        private readonly reflector: Reflector,
    ) { }

    async canActivate(context: ExecutionContext,): Promise<boolean> {
        try {
            const roles = this.reflector.getAllAndOverride<UserRole[]>(Roles, [
                context.getHandler(),
                context.getClass(),
            ]);

            const isPublic: boolean = (!roles || roles.length === 0);

            if (isPublic)
                return true;

            const request = context.switchToHttp().getRequest();
            const token: string = this.extractTokenFromHeader(request);

            if (!token) 
                throw new HttpException(`Acesso negado. Token não fornecido.`, HttpStatus.UNAUTHORIZED);

            const payload = await this.jwtServices.verifyAsync(token, { secret: process.env.JWT_SECRET_KEY });
            //const userRoles = payload.role || [];
            // const hasAllRoles = userRoles.every((role: UserRole) => roles.includes(role));
            
            // if (!hasAllRoles) {
            //     throw new HttpException(`Acesso negado. Permissões insuficientes.`, HttpStatus.FORBIDDEN);
            // }

            const userRole: UserRole = payload.role;
            if(!roles.includes(userRole)) {
                throw new HttpException(`Acesso negado. Permissões insuficientes.`, HttpStatus.UNAUTHORIZED);
            };
            
            request.user = payload;

            return true;
        } catch (error) {
            console.log(error)
            throw new HttpException(`Acesso negado. Houve erro no processamento da solicitação.`, HttpStatus.FORBIDDEN);
        }
    };

    private extractTokenFromHeader(request: Request): string | undefined {
        console.log(request.headers)
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }

};