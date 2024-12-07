import { AuthService } from 'core/services/AuthService';
import UserService from 'core/services/UserService';
import { AuthRepositoryImpl } from 'infrastructure/implements/user/AuthRepositoryImpl';
import { UserModel } from 'infrastructure/implements/user/db/user.mongo';
import { UserRepositoryImpl } from 'infrastructure/implements/user/UserRepositoryImpl';

const userService = new UserService(new UserRepositoryImpl(UserModel));


const authService = new AuthService(userService, new AuthRepositoryImpl());

export { authService,userService };
