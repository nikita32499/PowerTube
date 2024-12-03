import { Payment } from 'core/entities/payment';

export interface PaymentRepository {
    getAll(): Promise<Payment[]>;

    startPayment(): Promise<Payment>;

    getById(id: number): Promise<Payment>;

    cancelPayment(id: number): Promise<boolean>;
}
