import { ResponseSuccessBoolean } from '../../lib/response.types';
import { TProxy } from '../proxy.entities';

export type ResponseProxyGet = Pick<
    TProxy,
    'type' | 'host' | 'port' | 'login' | 'password'
>;

export type ResponseProxyChange = ResponseSuccessBoolean;

export type ResponseProxyDelete = ResponseSuccessBoolean;
