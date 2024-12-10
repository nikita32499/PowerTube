import { TUserJwtData } from 'core/repository/user/types/user.entities';
import { User } from '../../entities/user';
import { TAuthLogin, TAuthRegisterWithPassword } from './types/auth.operations';

export type IAuthService = {
    registerWithPassword(data: TAuthRegisterWithPassword['Request']): Promise<User>;

    login(data: TAuthLogin['Request']): Promise<User>;

    register(): Promise<User>;

    createUserToken(data: TUserJwtData): Promise<string>;

    validateToken(token: string): TUserJwtData | null;
};
