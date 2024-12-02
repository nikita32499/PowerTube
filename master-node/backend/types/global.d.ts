import { TUserJwtData } from 'shared-vpn-master';

declare module 'express' {
    interface Request {
        user?: TUserJwtData;
    }
}

export {};
