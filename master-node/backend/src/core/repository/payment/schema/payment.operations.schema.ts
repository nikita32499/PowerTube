import { Exactly, ZodSafe } from 'core/repository/lib/zod/zod';
import {
    EnumEnumPaymentType,
    EnumPaymentCurrency,
    EnumSubscriptionPeriod,
} from 'core/repository/payment/types/payment.entities';
import { TPaymentCreate } from 'core/repository/payment/types/payment.operations';
import { z } from 'zod';

export const SchemaPaymentStartRequest = ZodSafe(
    z.object({
        method: z.object({
            type: z.nativeEnum(EnumEnumPaymentType),
            currency: z.nativeEnum(EnumPaymentCurrency),
        }),
        period: z.nativeEnum(EnumSubscriptionPeriod),
        userId: z.string(),
    }),
).infer<Exactly<TPaymentCreate['Request']>>();

// export const SchemaPaymentStartResponse = ZodSafe(
//     z.object({
//         response: z.discriminatedUnion('success', [
//             z.object({
//                 success: z.literal(true),
//                 data: ,
//             }),
//             z.object({
//                 success: z.literal(false),
//                 error: z.string(),
//             }),
//         ]),
//     }),
// ).infer<Exactly<TPaymentCreate['Response']>>();
