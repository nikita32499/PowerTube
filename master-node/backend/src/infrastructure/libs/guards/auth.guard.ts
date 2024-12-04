import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

import { Reflector } from '@nestjs/core';

import { AuthService } from 'core/services/AuthService';
import UserService from 'core/services/UserService';
import { Config } from '../config';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private readonly userService: UserService,
        private readonly authService: AuthService,
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

        const userData = this.authService.validateToken(token);
        if (userData) {
            request.user = userData;
        } else {
            return false;
        }

        const userRole = this.userService.getUserRole(userData.userId);

        if (userRole && roles.includes(userRole)) return true;

        return false;
    }
}
