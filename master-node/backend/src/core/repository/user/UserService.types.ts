import { User } from 'core/entities/user';
import { TUserCreate, TUserSetAuth } from 'core/repository/user/types/user.operations';

import { UserAccessLevel } from './UserRepository.types';
import { EnumUserRole } from './types/user.entities';

export type IUserService = PromisifyMethods<
    {
        create(data: TUserCreate['Entity']): User;

        updateLastAt(userId: User['id']): boolean;

        // setAuth(data: TAuthOperation['DtoAuthSetAuth']): boolean;

        // setEmail(data: TUserSetEmail['Request']): boolean;

        setAuth(userId: User['id'], data: TUserSetAuth['Request']): boolean;

        setRole(userID: User['id'], role: EnumUserRole): boolean;

        cancelJwt(userId: User['id']): boolean;

        delete(userId: User['id']): boolean;

        getByEmail(email: User['email']): User;

        getById(userId: User['id']): User;

        getAll(): User[];

        getUserAccessLevel(userId: User['id']): UserAccessLevel;
    },
    'getUserAccessLevel'
>;
