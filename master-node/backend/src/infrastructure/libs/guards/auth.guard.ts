import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

import { Reflector } from '@nestjs/core';

import { NestAuthService } from 'infrastructure/modules/auth/NestAuth.service';
import { NestUserService } from 'infrastructure/modules/user/NestUser.service';
import { Config } from '../config';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private readonly userService: NestUserService,
        private readonly authService: NestAuthService,
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

        const userJwtData = this.authService.validateToken(token);
        if (userJwtData) {
            request.userJwtData = userJwtData;
        } else {
            return false;
        }

        const userAccessLevel = this.userService.getUserAccessLevel(userJwtData.userId);

        const roleAllowed = roles.includes(userAccessLevel.role);

        const jwtVersionAllowed =
            userAccessLevel.jwtVersion === userAccessLevel.jwtVersion;

        if (roleAllowed && jwtVersionAllowed) return true;

        return false;
    }
}
