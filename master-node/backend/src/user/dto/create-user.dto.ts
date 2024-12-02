import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const SchemaDeleteme = z.object({
  name: z.string(),
});

export class DeleteMe extends createZodDto(SchemaDeleteme) {}
