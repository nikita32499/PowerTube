import { AuthRepository } from 'core/repository/auth/AuthRepository.types';
import { IAuthService } from 'core/repository/auth/AuthService.types';
import { EnumSubscriptionStatus, EnumUserRole, TUserCreate } from 'shared-vpn-master';
import UserService from './UserService';

export class AuthService implements IAuthService {
    constructor(
        readonly userService: UserService,
        readonly authRepository: AuthRepository,
    ) {}

    login: IAuthService['login'] = async (data) => {
        const user = await this.userService.getByEmail(data.email);
        if (!user || !user.passwordHash) {
            throw Error('Не правильный логин или пароль');
        }

        const compareResult = await this.authRepository.comparePassword(
            data.password,
            user.passwordHash,
        );

        if (!compareResult) {
            throw Error('Не правильный логин или пароль');
        }

        return user;
    };

    registerWithPassword: IAuthService['registerWithPassword'] = async (data) => {
        const user = await this.userService.getByEmail(data.email);

        if (user) throw Error('Email занят');

        const createData: TUserCreate = {
            email: data.email,
            passwordHash: await this.authRepository.cryptPassword(data.password),
            role: EnumUserRole.USER,
            subscription: {
                status: EnumSubscriptionStatus.TRIALING,
                payments: [],
            },
            createdAt: Date.now(),
            lastAt: null,
            jwtVersion: 0,
            active: true,
            proxy: null,
        };

        const newUser = await this.userService.create(createData);

        return newUser;
    };

    register: IAuthService['register'] = () => {
        const createData: TUserCreate = {
            email: null,
            passwordHash: null,
            role: EnumUserRole.USER,
            subscription: {
                status: EnumSubscriptionStatus.TRIALING,
                payments: [],
            },
            createdAt: Date.now(),
            lastAt: null,
            jwtVersion: 0,
            active: true,
            proxy: null,
        };

        const newUser = this.userService.create(createData);

        return newUser;
    };

    createUserToken: IAuthService['createUserToken'] = (data) => {
        return this.authRepository.createUserToken(data);
    };

    validateToken: IAuthService['validateToken'] = (token) => {
        return this.authRepository.validateToken(token);
    };
}
