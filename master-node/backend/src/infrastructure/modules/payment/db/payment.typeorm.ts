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
    TSubscriptionTariff,
} from 'core/repository/payment/types/payment.entities';
import { EntitySchemaTyped, TypeormLib } from 'infrastructure/libs/typeorm/typeorm.libs';
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

const tariffSchema = new EntitySchemaTyped<TSubscriptionTariff>({
    name: 'tariff',
    columns: {
        period: {
            type: 'enum',
            enum: EnumSubscriptionPeriod,
            nullable: false,
        },
        price: {
            type: 'jsonb',

            nullable: false,
        },
    },
});

export const PaymentDB = new EntitySchemaTyped<TPayment, 'method' | 'tariff'>({
    name: 'Payment',
    tableName: 'payment',
    columns: {
        id: {
            type: 'varchar',
            primary: true,
            generated: 'uuid',
            nullable: false,
        },

        transactionId: {
            type: 'varchar',
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
            transformer: new TypeormLib.BigIntConverter(),
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
        userId: {
            type: 'varchar',
            nullable: false,
        },
    },

    embeddeds: {
        method: {
            schema: methodSchema,
        },
        tariff: {
            schema: tariffSchema,
        },
    },
});

export const SubscriptionDB = new EntitySchema<TSubscription>({
    name: 'Subscription',
    tableName: 'subscription',
    columns: {
        status: {
            type: 'enum',
            enum: EnumSubscriptionStatus,
            nullable: false,
        },
    },

    // embeddeds: {
    //     payments: {
    //         schema: PaymentDB,
    //         array: true,
    //     },
    // },

    // relations: {
    //     payments: {
    //         type: 'one-to-many',
    //         target: 'Payment',
    //     },
    // },
});
