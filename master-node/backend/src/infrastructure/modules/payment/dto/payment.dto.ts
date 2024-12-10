import { SchemaPaymentStartRequest } from 'core/repository/payment/schema/payment.operations.schema';
import {
    SchemaPayment,
    SchemaPaymentClient,
} from 'core/repository/payment/schema/payment.schema';
import { createZodDto } from 'nestjs-zod';

export class DtoPaymentClient extends createZodDto(SchemaPaymentClient) {}

export class DtoPaymentArray extends createZodDto(SchemaPayment.array()) {}

export class DtoPaymentStartRequest extends createZodDto(SchemaPaymentStartRequest) {}
