import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'core/entities/user';
import { UserRepository } from 'core/repository/user/UserRepository.types';
import { EnumUserRole, TUserCreate } from 'shared-vpn-master';
import { Repository } from 'typeorm';
import { UserModel } from './db/user.typeorm';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
    constructor(
        @InjectRepository(UserModel) private readonly userModel: Repository<UserModel>,
    ) {}
	delete(id: string): Promise<boolean> {
		throw new Error('Method not implemented.')
	}
	update(id: string, update: Partial<User>): Promise<boolean> {
		throw new Error('Method not implemented.')
	}
	create(data: TUserCreate): Promise<User> {
		throw new Error('Method not implemented.')
	}
	getUserRole(id: string): Promise<EnumUserRole> {
		throw new Error('Method not implemented.')
	}
	updateUserRoles(): Promise<boolean> {
		throw new Error('Method not implemented.')
	}

    userRoles: Record<string, EnumUserRole>;
    async getAll() {
        return await this.userModel.find();
    }
    async getOne(field: Partial<<Pick<User, 'role' | 'email' | 'id'>>>) {
        return await this.userModel.findOne({where:{email:null}})
    }
    delete(id: User['id']) {
        throw new Error('Method not implemented.');
    }
    update(id: User['id'], update: Partial<User>) {
        throw new Error('Method not implemented.');
    }
    create(data: TUserCreate) {
        throw new Error('Method not implemented.');
    }
    getUserRole(id: User['id']) {
        throw new Error('Method not implemented.');
    }
    updateUserRoles() {
        throw new Error('Method not implemented.');
    }
}
