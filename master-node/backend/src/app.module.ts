import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Config } from '_libs/config';
import { JwtAuthGuard } from '_libs/guards/auth.guard';
import { ProxyModel } from 'infrastructure/domain/proxy.entity';
import { UserModel } from 'infrastructure/domain/user.entity';
import { PaymentModule } from './payment/payment.module';
import { ProxyModule } from './proxy/proxy.module';
import { UserModule } from './user/user.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: Config.POSTGRES_HOST,
            port: Config.POSTGRES_PORT,
            username: Config.POSTGRES_USER,
            password: Config.POSTGRES_PASSWORD,
            database: Config.POSTGRES_DATABASE,
            entities: [UserModel, ProxyModel],
            autoLoadEntities: true,
            synchronize: true,
        }),
        UserModule,
        ProxyModule,
        PaymentModule,
    ],
    controllers: [],
    providers: [
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard,
        },
    ],
})
export class AppModule {}
