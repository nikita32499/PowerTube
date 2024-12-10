import { User } from 'core/entities/user';
import { TUser } from 'core/repository/user/types/user.entities';

export class UserMapper {
    static toEntity = (user: TUser) => {
        return new User(user);
    };
}
