import { z } from 'zod';
import { Exactly, ZodSafe } from '../lib/zod';
import { EnumUserRole, TUser, TUserJwtData } from '../types/user.entities';
import { SchemaSubscription } from './payment.schema';
import { SchemaProxy } from './proxy.schema';

export const SchemaUser = ZodSafe(
    z.object({
        id: z.string(),
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
