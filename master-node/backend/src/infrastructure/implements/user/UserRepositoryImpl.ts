import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'core/entities/user';
import { UserRepository } from 'core/repository/user/UserRepository.types';
import { EnumUserRole, TUser, TUserCreate } from 'core/types/user.entities';
import { Model } from 'mongoose';
import { UserMapper } from './mapper/UserMapper';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
    userRoles: Record<string, EnumUserRole> = {};

    constructor(@InjectModel('User') private readonly UserModel: Model<TUser>) {
        this.updateUserRoles();
    }

    async delete(id: string): Promise<boolean> {
        const result = await this.UserModel.deleteOne({ id });

        return result.acknowledged;
    }
    async update(id: string, update: Partial<User>): Promise<boolean> {
        const result = await this.UserModel.updateOne({ id }, update);
        return result.acknowledged;
    }
    async create(data: TUserCreate): Promise<User> {
        const newUser = await this.UserModel.create(data);

        return UserMapper.toEntity(newUser);
    }
    getUserRole(id: string): EnumUserRole {
        const role = this.userRoles[id];
        if (!role) throw Error('Пользователь не найден');
        return role;
    }
    async updateUserRoles(): Promise<boolean> {
        const usersList = await this.getAll();
        for (const user of usersList) {
            this.userRoles[user.id] = user.role;
        }
        return true;
    }

    async getAll() {
        const users = await this.UserModel.find();
        return users.map((user) => UserMapper.toEntity(user));
    }
    getOne: UserRepository['getOne'] = async (field) => {
        const user = await this.UserModel.findOne({ where: field });

        if (!user) throw Error('Пользователь не найден');

        return UserMapper.toEntity(user);
    };
}
