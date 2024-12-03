import { TypeormLib } from 'infrastructure/libs/typeorm/typeorm.libs';
import {
    EnumPaymentStatus,
    EnumSubscriptionPeriod,
    TPayment,
    TPaymentMethod,
} from 'shared-vpn-master';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('payment')
export class PaymentModel implements TPayment {
    @PrimaryGeneratedColumn()
    declare id: number;

    @Column('string')
    declare subscriptionId: string; // ID связанной подписки

    @Column({ type: 'enum', enum: EnumPaymentStatus })
    declare status: EnumPaymentStatus; // Статус оплаты

    @Column({
        type: 'bigint',
        default: () => Date.now().toString(),
        transformer: new TypeormLib.ColumnBigIntTransformer(),
    })
    declare createdAt: number; // Дата оплаты

    @Column('jsonb')
    declare method: TPaymentMethod; // Метод оплаты

    @Column({ type: 'enum', enum: EnumSubscriptionPeriod })
    declare period: EnumSubscriptionPeriod; // время работы подписки

    @Column({ type: 'string', nullable: true })
    declare details: string | null; // Дополнительные
}
