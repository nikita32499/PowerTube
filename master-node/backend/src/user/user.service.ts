import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TUser } from 'shared-vpn-master';
import { Repository } from 'typeorm';
import { UserModel } from '../infrastructure/domain/user.entity';

@Injectable()
export class UserService {
    constructor(@InjectRepository(UserModel) private User: Repository<UserModel>) {}
    // register = (req: RequestUserRegister): ResponseUserRegister => {
    //   if (req.type === 'uid') {
    //   }
    // };
    // login: (req: RequestUserLogin) => ResponseUserLogin;
    // updateRole: (req: RequestUserUpdateRole) => ResponseUserUpdateRole;
    // updateEmail: (req: RequestUserUpdateEmail) => ResponseUserUpdateEmail;
    // resetPassword: (req: RequestUserResetPassword) => ResponseUserResetPassword;
    // userDelete: (req: RequestUserDelete) => RequestUserDelete;

    getByLogin = async (login: string): Promise<TUser | null> => {
        const user = await this.User.findOne({ where: { auth: { login } } });
        return user;
    };
}
