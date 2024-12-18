import { PaymentApiRepository } from 'core/repository/payment/PaymentRepository';
import { EnumPaymentStatus } from 'core/repository/payment/types/payment.entities';

export class PaymentApiImpl implements PaymentApiRepository {
    initializePayment: PaymentApiRepository['initializePayment'] = async (payment) => {
        return payment;
    };

    checkPayment: PaymentApiRepository['checkPayment'] = async (id) => {
        console.log('checkPayment', id);
        return EnumPaymentStatus.PENDING;
    };

    cancelPayment: PaymentApiRepository['cancelPayment'] = async (id) => {
        console.log('checkPayment', id);
        return true;
    };
}
