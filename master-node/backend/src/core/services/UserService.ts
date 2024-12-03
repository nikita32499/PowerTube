import { User } from 'core/entities/user';
import { IUserService } from 'core/repository/user/UserService.types';
import { UserRepository } from '../repository/user/UserRepository.types';

export default class UserService implements IUserService {
    // userRoles: Record<string, EnumUserRole> = {};

    constructor(readonly userRepository: UserRepository) {
        // this.setUserRoles();
    }

    // private setUserRoles = () => {
    //     this.userRepository.getAll().forEach((user) => {
    //         this.userRoles[user.id] = user.role;
    //     });
    // };

    getAll: IUserService['getAll'] = () => {
        return this.userRepository.getAll();
    };
    getById: IUserService['getById'] = (id) => {
        return this.userRepository.getOne({ id });
    };
    getByEmail: IUserService['getByEmail'] = (email) => {
        return this.userRepository.getOne({ email });
    };
    delete: IUserService['delete'] = (id) => {
        return this.userRepository.delete(id);
    };
    cancelJwt: IUserService['cancelJwt'] = async (data) => {
        let { id, version } = data;
        if (!version) {
            const user = await this.userRepository.getOne({ id });
            if (!user) {
                throw Error('Пользователь не найден');
            }
            version = user.jwtVersion + 1;
        }

        return this.userRepository.update(id, { jwtVersion: version });
    };
    setEmail: IUserService['setEmail'] = (data) => {
        const { id, ...update } = data;
        return this.userRepository.update(id, update);
    };
    setAuth: IUserService['setAuth'] = (data) => {
        const emailBusy = Boolean(this.getByEmail(data.email));

        if (emailBusy) throw Error('Email занят');

        const { id, ...update } = data;
        return this.userRepository.update(id, update);
    };

    setRole: IUserService['setRole'] = (data) => {
        const { id, ...update } = data;
        const result = this.userRepository.update(id, update);

        this.userRepository.updateUserRoles();

        return result;
    };

    updateLastAt: IUserService['updateLastAt'] = (id: User['id']) => {
        return this.userRepository.update(id, { lastAt: Date.now() });
    };

    create: IUserService['create'] = (data) => {
        const newUser = this.userRepository.create(data);

        this.userRepository.updateUserRoles();

        return newUser;
    };

    getUserRole: IUserService['getUserRole'] = (id) => {
        return this.userRepository.getUserRole(id);
    };
}
