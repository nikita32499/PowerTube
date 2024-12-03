import { EnumUserRole, TProxy, TSubscription, TUser } from 'shared-vpn-master';
import { Subscription } from './payment';
import { Proxy } from './proxy';

export class User implements TUser {
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

    constructor(userData: TUser) {
        this.id = userData.id;
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
