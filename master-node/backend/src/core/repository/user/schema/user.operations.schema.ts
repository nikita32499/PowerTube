import { Exactly, ZodSafe } from 'core/repository/lib/zod/zod';
import { TUserCreate } from 'core/repository/user/types/user.operations';
import { z } from 'zod';

export const SchemaUserCreateRequest = ZodSafe(
    z.object({
        email: z.union([z.string(), z.null()]),
        password: z.union([z.string(), z.null()]),
    }),
).infer<Exactly<TUserCreate['Request']>>();
