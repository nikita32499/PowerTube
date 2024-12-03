import { z } from 'zod';

export const Config = z
    .object({
        JWT_SECRET_KEY: z.string(),
        ACCESS_TOKEN: z.string(),
        POSTGRES_HOST: z.string(),
        POSTGRES_PORT: z.number(),
        POSTGRES_USER: z.string(),
        POSTGRES_PASSWORD: z.string(),
        POSTGRES_DATABASE: z.string(),
    })
    .parse({
        ...process.env,
        POSTGRES_PORT: parseInt(process.env['POSTGRES_PORT']!),
    });
