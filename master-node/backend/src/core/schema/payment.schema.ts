import { z } from 'zod';

import {
    EnumEnumPaymentType,
    EnumPaymentCurrency,
    EnumPaymentStatus,
    EnumSubscriptionPeriod,
    EnumSubscriptionStatus,
    TPayment,
    TSubscription,
} from 'core/types/payment.entities';
import { Exactly, ZodSafe } from 'infrastructure/libs/zod/zod';

export const SchemaPayment = ZodSafe(
    z.object({
        id: z.number(),
        subscriptionId: z.string(),
        status: z.nativeEnum(EnumPaymentStatus),
        createdAt: z.number(),
        method: z.object({
            currency: z.nativeEnum(EnumPaymentCurrency),
            type: z.nativeEnum(EnumEnumPaymentType),
        }),
        period: z.nativeEnum(EnumSubscriptionPeriod),
        details: z.union([z.string(), z.null()]),
    }),
).infer<Exactly<TPayment>>();

export const SchemaSubscription = ZodSafe(
    z.object({
        status: z.nativeEnum(EnumSubscriptionStatus),
        payments: SchemaPayment.array(),
    }),
).infer<Exactly<TSubscription>>();
