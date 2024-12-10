import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserController } from 'infrastructure/modules/user/controllers/RestAPI/user.controller'
import { UserDB } from 'infrastructure/modules/user/db/user.typeorm'
import { UserRepositoryImpl } from 'infrastructure/modules/user/impl/UserRepositoryImpl'
import { NestUserService } from 'infrastructure/modules/user/NestUser.service'

@Module({
    imports: [TypeOrmModule.forFeature([UserDB])],
    controllers: [UserController],
    providers: [
        NestUserService,

        {
            provide: 'UserDatabaseRepository',
            useClass: UserRepositoryImpl,
        },
    ],
    exports: [NestUserService],
})
export class UserModule {}

