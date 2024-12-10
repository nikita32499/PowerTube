import { Inject, Injectable } from '@nestjs/common'
import {
    PaymentApiRepository,
    PaymentDatabaseRepository,
} from 'core/repository/payment/PaymentRepository'
import { PaymentService } from 'core/services/PaymentService'
import { NestUserService } from '../user/NestUser.service'

@Injectable()
export class NestPaymentService extends PaymentService {
    constructor(
        userService: NestUserService,

        @Inject('PaymentDatabaseRepository') paymentRepository: PaymentDatabaseRepository,

        @Inject('PaymentApiImpl') paymentApiRepository: PaymentApiRepository,
    ) {
        super(userService, paymentRepository, paymentApiRepository);
    }
}
