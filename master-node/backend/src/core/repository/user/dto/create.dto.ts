import { SchemaUserCreate } from 'core/schema/user.schema';
import { createZodDto } from 'nestjs-zod';

export class DtoUserCreate extends createZodDto(SchemaUserCreate) {}
