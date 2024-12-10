import { Inject, Injectable } from '@nestjs/common';
import { AuthRepository } from 'core/repository/auth/AuthRepository.types';
import { AuthService } from 'core/services/AuthService';
import { NestUserService } from '../user/NestUser.service';

@Injectable()
export class NestAuthService extends AuthService {
    constructor(
        userService: NestUserService,

        @Inject('AuthRepository') authRepository: AuthRepository,
    ) {
        super(userService, authRepository);
    }
}
