import { createZodDto } from 'nestjs-zod';
import { EnumUserRole } from 'shared-vpn-master';
import { z } from 'zod';

export class DtoAuthSetAuth extends createZodDto(
    z.object({
        id: z.string(),
        email: z.string(),
        password: z.string(),
    }),
) {}

export class DtoAuthSetRole extends createZodDto(
    z.object({
        id: z.string(),
        role: z.nativeEnum(EnumUserRole),
    }),
) {}

export class DtoAuthLogin extends createZodDto(
    z.object({
        email: z.string(),
        password: z.string(),
    }),
) {}

export class DtoAuthRegisterWithPassword extends createZodDto(
    z.object({
        email: z.string(),
        password: z.string(),
    }),
) {}
