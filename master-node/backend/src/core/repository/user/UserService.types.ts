import { User } from 'core/entities/user';
import { EnumUserRole, TUserCreate } from 'core/types/user.entities';
import { DtoAuthSetAuth, DtoAuthSetRole } from '../auth/dto/auth.dto';
import { DtoUserCancelJwt, DtoUserSetEmail } from './dto/set.dto';

export type IUserService = PromisifyMethods<
    {
        create(data: TUserCreate): User;

        updateLastAt(id: User['id']): boolean;

        setAuth(data: DtoAuthSetAuth): boolean;

        setEmail(data: DtoUserSetEmail): boolean;

        setAuth(data: DtoAuthSetAuth): boolean;

        setRole(data: DtoAuthSetRole): boolean;

        cancelJwt(data: DtoUserCancelJwt): boolean;

        delete(id: User['id']): boolean;

        getByEmail(email: User['email']): User;

        getById(id: User['id']): User;

        getAll(): User[];

        getUserRole(id: User['id']): EnumUserRole;
    },
    'getUserRole'
>;
