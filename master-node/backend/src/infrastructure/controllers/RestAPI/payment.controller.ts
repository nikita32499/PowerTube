import { Controller, Get, Post } from '@nestjs/common';
import { PaymentService } from '../../payment/payment.service';

@Controller('payment')
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) {}

    @Get('getAll')
    getAll() {
        return this.paymentService.getAll();
    }

    @Post('startPayment')
    startPayment() {
        return this.paymentService.startPayment();
    }

    @Post('cancelPayment')
    cancelPayment(id: number) {
        return this.paymentService.cancelPayment(id);
    }

    @Post('getById')
    getById(id: number) {
        return this.paymentService.getById(id);
    }
}
