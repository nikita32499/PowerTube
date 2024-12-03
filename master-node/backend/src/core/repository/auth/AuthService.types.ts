import { TUserJwtData } from 'shared-vpn-master';
import { User } from '../../entities/user';
import { DtoAuthLogin, DtoAuthRegisterWithPassword } from './dto/auth.dto';

export type IAuthService = PromisifyMethods<{
    registerWithPassword(data: DtoAuthRegisterWithPassword): User;

    login(data: DtoAuthLogin): User;

    register(): User;

    createUserToken(data: TUserJwtData): string;

    validateToken(token: string): TUserJwtData | null;
}>;
