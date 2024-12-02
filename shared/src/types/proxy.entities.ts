export enum EnumProxyType {
    HTTPS = 'https',
    HTTP = 'http',
}

export type TProxy = {
    id: number;
    type: EnumProxyType;
    login: string;
    password: string;
    ip: string;
    host: string;
    port: number;
    avail: boolean;
};
