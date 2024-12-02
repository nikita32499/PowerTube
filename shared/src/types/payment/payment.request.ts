import { TPayment } from '../payment.entities';

export type RequestPaymentStart = Pick<TPayment, 'method'>;

export type RequestPaymentCancel = Pick<TPayment, 'id'>;
