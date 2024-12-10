import { Payment } from 'core/entities/payment';
import { TPayment } from 'core/repository/payment/types/payment.entities';
import { TPaymentCreate } from 'core/repository/payment/types/payment.operations';
import { TUser } from 'core/repository/user/types/user.entities';

export type IPaymentService = {
    permissionsMap: Record<TUser['id'], TPayment['id'][]>;

    hasPermission(userId: TUser['id'], paymentId: TPayment['id']): boolean;

    getAll(): Promise<Payment[]>;

    startPayment(data: TPaymentCreate['Request']): Promise<Payment>;

    getByPaymentId(paymentId: TPayment['id']): Promise<Payment>;

    getPendingPaymentByUserId(userId: TUser['id']): Promise<Payment[]>;

    cancelPayment(paymentId: TPayment['id']): Promise<boolean>;
};
