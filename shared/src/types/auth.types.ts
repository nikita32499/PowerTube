import { TUser } from './user.entities';

export type TAuthRegister = Pick<TUser, 'role'	>;

export type TAuthRegisterWithPassword = {};
