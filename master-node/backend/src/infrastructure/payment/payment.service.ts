import { Injectable } from '@nestjs/common';

@Injectable()
export class PaymentService {
    getAll() {
        return [];
    }

    startPayment() {
        return { status: 'started' };
    }

    cancelPayment(id: number) {
        return { status: 'cancelled', id };
    }

    getById(id: number) {
        return { id };
    }
} 