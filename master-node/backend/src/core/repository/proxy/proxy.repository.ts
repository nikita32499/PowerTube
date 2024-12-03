import { Proxy } from 'core/entities/proxy';

export interface ProxyRepository {
    createProxy(): Proxy;
    checkProxy(proxy: Proxy): boolean;
}
