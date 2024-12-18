import { TSubscription } from './payment.entities'
import { TProxy } from './proxy.entities'

export enum EnumUserRole {
    USER = 'USER',
    ADMIN = 'ADMIN',
}

//

export type TUser = {
    id: string;
    passwordHash: string | null;
    email: string | null;
    role: EnumUserRole;
    jwtVersion: number;
    lastAt: number | null;
    createdAt: number;
    subscription: TSubscription;
    proxy: TProxy | null;
    active: boolean;    
};

export type TUserJwtData = {
    userId: TUser['id'];
    version: number;
};

export type TUserCreate = Omit<TUser, 'id'>;
