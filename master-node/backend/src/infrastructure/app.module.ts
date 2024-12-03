import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Config } from '_libs/config';
import { JwtAuthGuard } from '_libs/guards/auth.guard';
import { PaymentModel } from 'infrastructure/implements/payment/db/payment.typeorm';
import { ProxyModel } from 'infrastructure/implements/proxy/db/proxy.typeorm';
import { UserModel } from 'infrastructure/implements/user/db/user.typeorm';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: Config.POSTGRES_HOST,
            port: Config.POSTGRES_PORT,
            username: Config.POSTGRES_USER,
            password: Config.POSTGRES_PASSWORD,
            database: Config.POSTGRES_DATABASE,
            entities: [UserModel, ProxyModel, PaymentModel],
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
