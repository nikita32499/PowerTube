import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentDatabaseRepository } from 'core/repository/payment/PaymentRepository';
import { TPayment } from 'core/repository/payment/types/payment.entities';
import { TypeormLib } from 'infrastructure/libs/typeorm/typeorm.libs';
import { Repository } from 'typeorm';
import { PaymentDB } from '../db/payment.typeorm';

@Injectable()
export class PaymentDatabaseRepositoryImpl implements PaymentDatabaseRepository {
    constructor(
        @InjectRepository(PaymentDB)
        private readonly paymentDB: Repository<TPayment>,
    ) {}
    getAll: PaymentDatabaseRepository['getAll'] = async () => {
        const paymentsList = await this.paymentDB.find();
        return paymentsList;
    };
    getById: PaymentDatabaseRepository['getById'] = async (paymentId) => {
        const payment = await this.paymentDB.findOneBy({ id: paymentId });
        if (!payment) throw new Error('Оплата не найдена');
        return payment;
    };
    create: PaymentDatabaseRepository['create'] = async (newPayment) => {
        const payment = await this.paymentDB.save(newPayment);
        return payment;
    };
    update: PaymentDatabaseRepository['update'] = async (id, update) => {
        const payment = await this.paymentDB.update(id, update);
        return TypeormLib.isAffectedSuccess(payment);
    };
    delete: PaymentDatabaseRepository['delete'] = async (id) => {
        const payment = await this.paymentDB.delete(id);
        return TypeormLib.isAffectedSuccess(payment);
    };
}
