// import { TypeormLib } from '_libs/typeorm/typeorm.libs';
// import { ProxyModel } from 'infrastructure/implements/proxy/db/proxy.typeorm';
// import { EnumUserRole, TSubscription, TUser } from 'shared-vpn-master';
// import { Column, Entity, OneToOne, PrimaryColumn } from 'typeorm';

import { EnumUserRole, TUser } from 'core/types/user.entities';
import { SubscriptionDB } from 'infrastructure/implements/payment/db/payment.typeorm';
import { ProxyDB } from 'infrastructure/implements/proxy/db/proxy.typeorm';
import { EntitySchemaTyped } from 'infrastructure/libs/typeorm/typeorm.libs';
import { EntitySchema } from 'typeorm';

// @Entity('users')
// export class UserModel implements TUser {
//     @Column('string', { nullable: true })
//     declare passwordHash: string | null;

//     @Column('boolean')
//     declare active: boolean;

//     @PrimaryColumn()
//     declare id: string;

//     @Column('string', { nullable: true, unique: true })
//     declare email: string | null;

//     @Column({ type: 'enum', enum: EnumUserRole, default: EnumUserRole.USER })
//     declare role: EnumUserRole;

//     @Column({
//         type: 'bigint',
//         default: null,
//         transformer: new TypeormLib.ColumnBigIntTransformer(),
//         nullable: true,
//     })
//     declare lastAt: number | null;

//     @Column({
//         type: 'bigint',
//         default: () => Date.now().toString(),
//         transformer: new TypeormLib.ColumnBigIntTransformer(),
//     })
//     declare createdAt: number;

//     @Column({
//         type: 'jsonb',
//     })
//     declare subscription: TSubscription;

//     @OneToOne(() => ProxyModel, { eager: true })
//     declare proxy: ProxyModel | null;

//     @Column('number', { default: 0 })
//     declare jwtVersion: number;
// }

export const UserDB = new EntitySchemaTyped<TUser, 'subscription' | 'proxy'>({
    name: 'User', // Имя сущности
    tableName: 'users', // Опционально, если имя таблицы отличается
    columns: {
        id: {
            type: 'varchar',
            nullable: false,
            primary: true,
            
        },

        passwordHash: {
            type: 'varchar',
            nullable: true,
        },
        email: {
            type: 'varchar',
            nullable: true,
        },  
        role: {
            type: 'enum',
            enum: EnumUserRole,
            nullable: false,
        },
        jwtVersion: {
            type: 'int',
            nullable: false,
        },
        lastAt: {
            type: 'bigint',
            nullable: true,
        },  
        createdAt: {
            type: 'bigint',
            nullable: false,
        },
        active: {
            type: 'boolean',
            nullable: false,
        },  
    },  
    embeddeds: {
        subscription: {
            schema: SubscriptionDB,
        },
        proxy: {
            schema: ProxyDB,
        },
    },
});
