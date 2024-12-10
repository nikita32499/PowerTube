import { TSubscription } from 'core/repository/payment/types/payment.entities';
import { TProxy } from 'core/repository/proxy/types/proxy.entities';
import { EnumUserRole, TUser } from 'core/repository/user/types/user.entities';
import { Subscription } from './payment';
import { Proxy } from './proxy';

export class User implements TUser {
    id: string;
    authId: string;
    passwordHash: string | null;
    email: string | null;
    role: EnumUserRole;
    jwtVersion: number;
    lastAt: number | null;
    createdAt: number;
    subscription: TSubscription;
    proxy: TProxy | null;
    active: boolean;

    constructor(userData: TUser) {
        this.id = userData.id;
        this.authId = userData.authId;
        this.email = userData.email;
        this.passwordHash = userData.passwordHash;
        this.role = userData.role;
        this.jwtVersion = userData.jwtVersion;
        this.lastAt = userData.lastAt;
        this.createdAt = userData.createdAt;
        this.subscription = new Subscription(userData.subscription);
        this.proxy = userData.proxy ? new Proxy(userData.proxy) : null;
        this.active = userData.active;
    }
}
