import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

import { Reflector } from '@nestjs/core';

import { Config } from '_libs/config';
import { AuthService } from 'auth/auth.service';
import { UsersService } from 'user/users.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(
        private readonly authService: AuthService,
        private reflector: Reflector,
        private readonly userService: UsersService,
    ) {}

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest<Request>();

        if (request.headers['access-token'] === Config.ACCESS_TOKEN) {
            return true;
        }

        const roles = this.reflector.get<string[]>('roles', context.getHandler()) ?? [];

        if (roles.includes('public')) return true;

        const token: string | undefined = request.cookies['authorization'];

        if (!token) return false;

        const user_data = this.authService.validateToken(token);
        if (user_data) {
            request.user = user_data;
        } else {
            return false;
        }

        const userRole = this.userService.resolveRoleByUserId(user_data.userId);

        if (userRole && roles.includes(userRole)) return true;

        return false;
    }
}
