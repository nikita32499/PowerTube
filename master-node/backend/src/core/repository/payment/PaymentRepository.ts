import { Payment } from 'core/entities/payment';
import { TPayment } from 'core/repository/payment/types/payment.entities';
import { TPaymentCreate } from 'core/repository/payment/types/payment.operations';

export type PaymentDatabaseRepository = PromisifyMethods<{
    getAll(): Payment[];

    getById(paymentId: TPayment['id']): Payment;

    create(newPayment: TPaymentCreate['Entity']): Payment;

    update(id: TPayment['id'], update: Pick<TPayment, 'details' | 'status'>): boolean;

    delete(id: TPayment['id']): boolean;
}>;

export type PaymentApiRepository = PromisifyMethods<{
    initializePayment(payment: TPaymentCreate['Entity']): TPaymentCreate['Entity'];

    checkPayment(id: TPayment['id']): TPayment['status'];

    cancelPayment(id: TPayment['id']): boolean;
}>;
