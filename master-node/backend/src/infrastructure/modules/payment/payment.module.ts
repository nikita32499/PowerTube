import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { PaymentController } from './controllers/RestAPI/payment.controller';
import { PaymentDB } from './db/payment.typeorm';
import { PaymentApiImpl } from './impl/PaymentApiImpl';
import { PaymentDatabaseRepositoryImpl } from './impl/PaymentDatabaseRepositoryImpl';
import { NestPaymentService } from './NestPayment.service';

@Module({
    imports: [TypeOrmModule.forFeature([PaymentDB]), forwardRef(() => UserModule)],
    controllers: [PaymentController],
    providers: [
        NestPaymentService,
        {
            provide: 'PaymentDatabaseRepository',
            useClass: PaymentDatabaseRepositoryImpl,
        },
        {
            provide: 'PaymentApiImpl',
            useClass: PaymentApiImpl,
        },
    ],
})
export class PaymentModule {}
