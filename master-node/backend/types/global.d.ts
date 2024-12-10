import { TUserJwtData } from 'core/repository/user/types/user.entities';

declare module 'express' {
    interface Request {
        userJwtData?: TUserJwtData;
    }
}

export {};
