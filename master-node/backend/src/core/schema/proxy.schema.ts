import { Exactly, ZodSafe } from 'infrastructure/libs/zod/zod';
import { z } from 'zod';
import { EnumProxyType, TProxy } from '../types/proxy.entities';

export const SchemaProxy = ZodSafe(
    z.object({
        id: z.number(),
        type: z.nativeEnum(EnumProxyType),
        login: z.string(),
        password: z.string(),
        ip: z.string(),
        host: z.string(),
        port: z.number(),
        avail: z.boolean(),
    }),
).infer<Exactly<TProxy>>();
