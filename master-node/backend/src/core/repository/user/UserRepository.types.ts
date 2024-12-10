import { User } from 'core/entities/user';
import { EnumUserRole } from 'core/repository/user/types/user.entities';
import { TUserCreate } from 'core/repository/user/types/user.operations';

export type UserAccessLevel = { role: EnumUserRole; jwtVersion: number };

export type UserDatabaseRepository = PromisifyMethods<
    {
        usersAccessLevel: Record<User['id'], UserAccessLevel>;

        getAll(): User[];

        getOne(field: Partial<Pick<User, 'role' | 'email' | 'id'>>): User;

        delete(id: User['id']): boolean;

        update(id: User['id'], update: Partial<User>): boolean;

        create(data: TUserCreate['Entity']): User;

        getUserAccessLevel(id: User['id']): UserAccessLevel;

        updateUserAccessLevel(): boolean;
    },
    'getUserAccessLevel'
>;
