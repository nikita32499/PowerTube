import { User } from 'core/entities/user';
import { EnumUserRole, TUserCreate } from 'core/types/user.entities';
export type UserRepository = PromisifyMethods<
    {
        userRoles: Record<User['id'], EnumUserRole>;

        getAll(): User[];

        getOne(field: Partial<Pick<User, 'role' | 'email' | 'id'>>): User;

        delete(id: User['id']): boolean;

        update(id: User['id'], update: Partial<User>): boolean;

        create(data: TUserCreate): User;

        getUserRole(id: User['id']): EnumUserRole;

        updateUserRoles(): boolean;
    },
    'getUserRole'
>;
