// import { TypeormLib } from 'infrastructure/libs/typeorm/typeorm.libs';
// import {
//     EnumPaymentStatus,
//     EnumSubscriptionPeriod,
//     TPayment,
//     TPaymentMethod,
// } from 'shared-vpn-master';
// import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import {
    EnumEnumPaymentType,
    EnumPaymentCurrency,
    EnumPaymentStatus,
    EnumSubscriptionPeriod,
    EnumSubscriptionStatus,
    TPayment,
    TPaymentMethod,
    TSubscription,
} from 'core/types/payment.entities';
import { EntitySchemaTyped } from 'infrastructure/libs/typeorm/typeorm.libs';
import { EntitySchema } from 'typeorm';

// @Entity('payment')
// export class PaymentModel implements TPayment {
//     @PrimaryGeneratedColumn()
//     declare id: number;

//     @Column('string')
//     declare subscriptionId: string; // ID связанной подписки

//     @Column({ type: 'enum', enum: EnumPaymentStatus })
//     declare status: EnumPaymentStatus; // Статус оплаты

//     @Column({
//         type: 'bigint',
//         default: () => Date.now().toString(),
//         transformer: new TypeormLib.ColumnBigIntTransformer(),
//     })
//     declare createdAt: number; // Дата оплаты

//     @Column('jsonb')
//     declare method: TPaymentMethod; // Метод оплаты

//     @Column({ type: 'enum', enum: EnumSubscriptionPeriod })
//     declare period: EnumSubscriptionPeriod; // время работы подписки

//     @Column({ type: 'string', nullable: true })
//     declare details: string | null; // Дополнительные
// }

//;

const methodSchema = new EntitySchemaTyped<TPaymentMethod>({
    name: 'method',

    columns: {
        currency: {
            type: 'enum',
            enum: EnumPaymentCurrency,
            nullable: false,
        },
        type: {
            type: 'enum',
            enum: EnumEnumPaymentType,
            nullable: false,
        },
    },
});

export const PaymentDB = new EntitySchemaTyped<TPayment, 'method'>({
    name: 'Payment',
    tableName:"payment",
    columns: {
        id: {
            type: 'int',
            primary: true,
            default: 0,
            nullable: false,
        },

        status: {
            type: 'enum',
            enum: EnumPaymentStatus,
            nullable: false,
        },
        createdAt: {
            type: 'bigint',
            nullable: false,
        },
        period: {
            type: 'enum',
            enum: EnumSubscriptionPeriod,
            nullable: false,
        },

        details: {
            type: 'text',
            nullable: true,
        },
        subscriptionId: {
            type: 'varchar',
            nullable: false,
        },
    },

    embeddeds: {
        method: {
            schema: methodSchema,
        },
    },
}); 

export const SubscriptionDB = new EntitySchemaTyped<TSubscription, 'payments'>({
    name: 'Subscription',
    tableName:"subscription",
    columns: {
        status: {
            type: 'enum',
            enum: EnumSubscriptionStatus,
            nullable: false,
        },
    },

    embeddeds: {
        payments: {
            schema: PaymentDB,
            array: true,
        },
    },
});
