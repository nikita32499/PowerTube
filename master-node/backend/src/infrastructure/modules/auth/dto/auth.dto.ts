import {
    SchemaAuthLogin,
    SchemaAuthRegisterWithPassword,
} from 'core/repository/auth/schema/auth.schema.operations';
import { createZodDto } from 'nestjs-zod';

export class DtoAuthRegisterWithPassword extends createZodDto(
    SchemaAuthRegisterWithPassword,
) {}

export class DtoAuthLogin extends createZodDto(SchemaAuthLogin) {}
