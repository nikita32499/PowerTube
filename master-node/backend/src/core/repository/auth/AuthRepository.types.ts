import { TUserJwtData } from 'core/types/user.entities';

export type AuthRepository = PromisifyMethods<
    {
        cryptPassword(password: string): string;

        comparePassword(password: string, passwordHash: string): boolean;

        createUserToken(data: TUserJwtData): string;

        validateToken(token: string): TUserJwtData | null;
    },
    'validateToken'
>;
