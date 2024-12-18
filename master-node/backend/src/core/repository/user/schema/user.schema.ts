import { Exactly, ZodSafe } from 'core/repository/lib/zod/zod';
import { SchemaPayment } from 'core/repository/payment/schema/payment.schema';
import {
    EnumSubscriptionStatus,
    TSubscription,
} from 'core/repository/payment/types/payment.entities';
import { SchemaProxy } from 'core/repository/proxy/schema/proxy.schema';
import { z } from 'zod';
import { EnumUserRole, TUser, TUserClient, TUserJwtData } from '../types/user.entities';

export const SchemaSubscription = ZodSafe(
    z.object({
        status: z.nativeEnum(EnumSubscriptionStatus),
        payments: SchemaPayment.array(),
    }),
).infer<Exactly<TSubscription>>();

export const SchemaUser = ZodSafe(
    z.object({
        id: z.string(),
        authId: z.string(),
        passwordHash: z.union([z.string(), z.null()]),
        email: z.union([z.string(), z.null()]),
        role: z.nativeEnum(EnumUserRole),
        jwtVersion: z.number(),
        lastAt: z.union([z.number(), z.null()]),
        createdAt: z.number(),
        subscription: SchemaSubscription,
        proxy: z.union([z.null(), SchemaProxy]),
        active: z.boolean(),
    }),
).infer<Exactly<TUser>>();

export const SchemaUserJwtData = ZodSafe(
    z.object({
        userId: z.string(),
        version: z.number(),
    }),
).infer<Exactly<TUserJwtData>>();

export const SchemaUserClient = ZodSafe(
    SchemaUser.pick({
        id: true,
        createdAt: true,
        lastAt: true,
        subscription: true,
        proxy: true,
    }),
).infer<Exactly<TUserClient>>();
