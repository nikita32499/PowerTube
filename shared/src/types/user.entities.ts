import { TSubscription } from './payment.entities';
import { TProxy } from './proxy.entities';

export enum EnumUserRole {
    USER = 'USER',
    ADMIN = 'ADMIN',
}

//
export type TUserAuth = {
    login: string;
    passwordHash: string;
};

export type TUser = {
    id: number;
    auth: TUserAuth | null;
    email: string | null;
    role: EnumUserRole;
    jwtVersion: number;
    lastAt: number | null;
    createdAt: number;
    subscription: TSubscription;
    proxy: TProxy | null;
};

export type TUserJwtData = {
    userId: TUser['id'];
    version: number;
};

abstract class User implements TUser {
    abstract id: number;
    abstract auth: TUserAuth | null;
    abstract email: string | null;
    abstract role: EnumUserRole;
    abstract jwtVersion: number;
    abstract lastAt: number | null;
    abstract createdAt: number;
    abstract subscription: TSubscription;
    abstract proxy: TProxy | null;

    abstract isActive(): boolean;
}

// const user1:TUser={
//     id:1,
//     auth:null,
//     email:null,
//     role:EnumUserRole.ADMIN,
//     jwtVersion:0,
//     lastAt:null,
//     createdAt:Date.now(),
//     subscription

// }
