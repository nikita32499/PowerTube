import {
    Body,
    Controller,
    Get,
    NotFoundException,
    Param,
    Post,
    Req,
    ValidationPipe,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Payment } from 'core/entities/payment';
import { PaymentMapper } from 'core/repository/payment/mapper/payment';
import { TPaymentClient } from 'core/repository/payment/types/payment.entities';
import { EnumUserRole } from 'core/repository/user/types/user.entities';
import { Request } from 'express';
import { GetUserId, SetPermissions } from 'infrastructure/libs/decorators/controller';
import {
    DtoPaymentArray,
    DtoPaymentClient,
    DtoPaymentStartRequest,
} from '../../dto/payment.dto';
import { NestPaymentService } from '../../NestPayment.service';

@ApiTags('Payment')
@Controller('payment')
export class PaymentController {
    constructor(private readonly paymentService: NestPaymentService) {}

    @ApiOkResponse({
        description: 'Get all payments',
        type: DtoPaymentArray,
    })
    @SetPermissions(EnumUserRole.ADMIN)
    @Get('getAll')
    getAll(): Promise<Payment[]> {
        return this.paymentService.getAll();
    }

    @ApiCreatedResponse({
        description: 'Start payment',
        type: DtoPaymentClient,
    })
    @SetPermissions(EnumUserRole.USER)
    @Post('startPayment')
    async startPayment(@Body() data: DtoPaymentStartRequest) {
        const payment = await this.paymentService.startPayment(data);

        return PaymentMapper.toClientFormat(payment);
    }

    @ApiOkResponse({
        description: 'Cancel payment',
        type: Boolean,
    })
    @SetPermissions(EnumUserRole.USER)
    @Post('cancelPayment')
    cancelPayment(
        @GetUserId() userId: string,
        @Param('paymentId', new ValidationPipe()) paymentId: string,
    ) {
        const hasPermission = this.paymentService.hasPermission(userId, paymentId);

        if (!hasPermission) {
            throw new NotFoundException('Payment not found');
        }

        return this.paymentService.cancelPayment(paymentId);
    }

    @ApiOkResponse({
        description: 'Get payment by id',
        type: DtoPaymentClient,
    })
    @SetPermissions(EnumUserRole.USER)
    @Post('getById')
    async getById(
        @Req() req: Request,
        @Param('paymentId', new ValidationPipe()) paymentId: string,
    ): Promise<TPaymentClient> {
        const userId = String(req.userJwtData?.userId);

        const hasPermission = this.paymentService.hasPermission(userId, paymentId);

        if (!hasPermission) {
            throw new NotFoundException('Payment not found');
        }

        const payment = await this.paymentService.getByPaymentId(paymentId);

        if (!payment) {
            throw new NotFoundException('Payment not found');
        }

        return PaymentMapper.toClientFormat(payment);
    }
}
