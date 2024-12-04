import UserService from 'core/services/UserService';
import { UserModel } from 'infrastructure/implements/user/db/user.mongo';
import { UserRepositoryImpl } from 'infrastructure/implements/user/UserRepositoryImpl';

const userService = new UserService(new UserRepositoryImpl(UserModel));
