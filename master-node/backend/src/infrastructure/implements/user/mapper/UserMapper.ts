import { User } from 'core/entities/user';
import { TUser } from 'core/types/user.entities';
import { Types } from 'mongoose';

type UserMongo = TUser & {
    _id: Types.ObjectId;
};

export class UserMapper {
    static toEntity = (user: UserMongo) => {
        return new User(user);
    };
}
