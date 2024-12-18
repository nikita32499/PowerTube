import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'core/entities/user';
import { UserMapper } from 'core/repository/user/mapper/user.mapper';
import { Response } from 'express';
import { SetPermissions } from 'infrastructure/libs/decorators/controller';
import { NestAuthService } from 'infrastructure/modules/auth/NestAuth.service';
import { DtoUserClient } from 'infrastructure/modules/user/dto/user.dto';
import { DtoAuthLogin, DtoAuthRegisterWithPassword } from '../../dto/auth.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: NestAuthService) {}

    @ApiOkResponse({
        description: 'Login a user',
        type: DtoUserClient,
    })
    @SetPermissions('public')
    @Post('login')
    async login(@Body() data: DtoAuthLogin, @Res() response: Response) {
        const user = await this.authService.login(data);

        await this.setAccessToken(user, response);

        return { user: UserMapper.toClientFormat(user) };
    }

    @ApiOkResponse({
        description: 'Register a new user with password',
        type: DtoUserClient,
    })
    @SetPermissions('public')
    @Post('register-with-Password')
    async registerWithPassword(
        @Body() data: DtoAuthRegisterWithPassword,
        @Res() response: Response,
    ) {
        const user = await this.authService.registerWithPassword(data);

        await this.setAccessToken(user, response);

        return { user: UserMapper.toClientFormat(user) };
    }

    @ApiOkResponse({ description: 'Register a new user', type: DtoUserClient })
    @SetPermissions('public')
    @Post('register')
    async register(@Res() response: Response) {
        const user = await this.authService.register();

        await this.setAccessToken(user, response);

        return { user: UserMapper.toClientFormat(user) };
    }

    private async setAccessToken(user: User, response: Response) {
        const token = await this.authService.createUserToken({
            userId: user.id,
            version: user.jwtVersion,
        });

        await this.setCookie('access_token', token, response);
    }

    private async setCookie(name: string, value: string, response: Response) {
        response.cookie(name, value, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000,
            signed: true,
        });
    }
}
