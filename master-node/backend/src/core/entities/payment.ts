import {
    EnumPaymentStatus,
    EnumSubscriptionPeriod,
    TPayment,
    TPaymentMethod,
    TSubscription,
} from 'shared-vpn-master';
import { EnumSubscriptionStatus } from 'shared-vpn-master/src/types/payment.entities';

export class Payment implements TPayment {
    id: number;
    subscriptionId: string;
    status: EnumPaymentStatus;
    createdAt: number;
    method: TPaymentMethod;
    period: EnumSubscriptionPeriod;
    details: string | null;

    constructor({
        id,
        subscriptionId,
        status,
        createdAt,
        method,
        period,
        details,
    }: TPayment) {
        this.id = id;
        this.subscriptionId = subscriptionId;
        this.status = status;
        this.createdAt = createdAt;
        this.method = method;
        this.period = period;
        this.details = details;
    }
}

export class Subscription implements TSubscription {
    status: EnumSubscriptionStatus;
    payments: Payment[];
    constructor(dataSub: TSubscription) {
        this.status = dataSub.status;
        this.payments = dataSub.payments.map((payment) => new Payment(payment));
    }
}
