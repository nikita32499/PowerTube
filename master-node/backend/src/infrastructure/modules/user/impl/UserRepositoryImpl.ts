import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'core/entities/user';
import { UserDatabaseRepository } from 'core/repository/user/UserRepository.types';
import { EnumUserRole, TUser } from 'core/repository/user/types/user.entities';
import { TUserCreate } from 'core/repository/user/types/user.operations';
import { TypeormLib } from 'infrastructure/libs/typeorm/typeorm.libs';
import { Repository } from 'typeorm';
import { UserDB } from '../db/user.typeorm';
import { UserMapper } from '../mapper/UserMapper';

@Injectable()
export class UserRepositoryImpl implements UserDatabaseRepository {
    usersAccessLevel: Record<TUser['id'], { role: EnumUserRole; jwtVersion: number }> =
        {};

    constructor(
        @InjectRepository(UserDB)
        private readonly userDB: Repository<TUser>,
    ) {
        this.updateUserAccessLevel();
    }

    async delete(id: string): Promise<boolean> {
        const result = await this.userDB.softDelete(id);

        return TypeormLib.isAffectedSuccess(result);
    }
    async update(id: string, update: Partial<User>): Promise<boolean> {
        const result = await this.userDB.update(id, update);
        return TypeormLib.isAffectedSuccess(result);
    }
    async create(data: TUserCreate['Entity']): Promise<User> {
        const newUser = await this.userDB.save(data);

        return UserMapper.toEntity(newUser);
    }
    getUser(id: string): { role: EnumUserRole; jwtVersion: number } {
        const accessLevel = this.usersAccessLevel[id];
        if (!accessLevel) throw Error('Пользователь не найден');
        return accessLevel;
    }

    async getAll() {
        const users = await this.userDB.find({ withDeleted: true });
        return users.map((user) => UserMapper.toEntity(user));
    }
    getOne: UserDatabaseRepository['getOne'] = async (field) => {
        const whereOption = TypeormLib.whereOptionMapper(field);

        const user = await this.userDB.findOne({ where: whereOption });

        if (!user) throw Error('Пользователь не найден');

        return UserMapper.toEntity(user);
    };

    getUserAccessLevel(id: string): { role: EnumUserRole; jwtVersion: number } {
        const accessLevel = this.usersAccessLevel[id];
        if (!accessLevel) throw Error('Пользователь не найден');
        return accessLevel;
    }

    async updateUserAccessLevel(): Promise<boolean> {
        const usersList = await this.getAll();
        for (const user of usersList) {
            this.usersAccessLevel[user.id] = {
                role: user.role,
                jwtVersion: user.jwtVersion,
            };
        }
        return true;
    }
}
