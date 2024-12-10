import { Inject, Injectable } from '@nestjs/common';
import { UserDatabaseRepository } from 'core/repository/user/UserRepository.types';
import { UserService } from 'core/services/UserService';

@Injectable()
export class NestUserService extends UserService {
    constructor(
        @Inject('UserDatabaseRepository') userRepository: UserDatabaseRepository,
    ) {
        super(userRepository);
    }
}
