import { z } from 'zod';
import { Exactly, ZodSafe } from '../lib/zod';
import {
    EnumEnumPaymentType,
    EnumPaymentCurrency,
    EnumPaymentStatus,
    EnumSubscriptionPeriod,
    EnumSubscriptionStatus,
    TPayment,
    TSubscription,
} from '../types/payment.entities';

export const SchemaPayment = ZodSafe(
    z.object({
        id: z.number(),
        subscriptionId: z.string(),
        status: z.nativeEnum(EnumPaymentStatus),
        createdAt: z.number(),
        method: z.object({
            currency: z.nativeEnum(EnumPaymentCurrency),
            type: z.union([
                z.literal(EnumEnumPaymentType.CARD),
                z.literal(EnumEnumPaymentType.SBP),
            ]),
        }),
        period: z.nativeEnum(EnumSubscriptionPeriod),
        details: z.union([z.object({}), z.null()]),
    }),
).infer<Exactly<TPayment>>();

export const SchemaSubscription = ZodSafe(
    z.object({
        status: z.nativeEnum(EnumSubscriptionStatus),
        payments: SchemaPayment.array(),
    }),
).infer<Exactly<TSubscription>>();
