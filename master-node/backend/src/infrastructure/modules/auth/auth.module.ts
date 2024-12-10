import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from 'infrastructure/modules/auth/controllers/RestAPI/auth.controller';
import { AuthRepositoryImpl } from 'infrastructure/modules/auth/impl/AuthRepositoryImpl';
import { NestAuthService } from 'infrastructure/modules/auth/NestAuth.service';
import { UserDB } from 'infrastructure/modules/user/db/user.typeorm';
import { UserModule } from '../user/user.module';

@Module({
    imports: [TypeOrmModule.forFeature([UserDB]), UserModule],
    controllers: [AuthController],
    providers: [
        NestAuthService,
        {
            provide: 'AuthRepository',
            useClass: AuthRepositoryImpl,
        },
    ],
    exports: [NestAuthService],
})
export class AuthModule {}
