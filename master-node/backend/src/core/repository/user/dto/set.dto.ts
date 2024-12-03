import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export class DtoUserSetEmail extends createZodDto(
    z.object({
        id: z.string(),
        email: z.string(),
    }),
) {}

export class DtoUserCancelJwt extends createZodDto(
    z.object({
        id: z.string(),
        version: z.number().optional(),
    }),
) {}
