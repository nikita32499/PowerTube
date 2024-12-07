// import { EnumProxyType, TProxy } from 'shared-vpn-master';
// import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { EnumProxyType, TProxy } from 'core/types/proxy.entities';
import { EntitySchemaTyped } from 'infrastructure/libs/typeorm/typeorm.libs';
import { EntitySchema } from 'typeorm';

// @Entity('proxy')
// export class ProxyModel implements TProxy {
//     @PrimaryGeneratedColumn()
//     declare id: number;

//     @Column({ type: 'enum', enum: EnumProxyType })
//     declare type: EnumProxyType;

//     @Column('string')
//     declare login: string;

//     @Column('string')
//     declare password: string;

//     @Column('string')
//     declare host: string;

//     @Column('string')
//     declare ip: string;

//     @Column('number')
//     declare port: number;

//     @Column('boolean')
//     declare avail: boolean;
// }

export const ProxyDB = new EntitySchemaTyped<TProxy>({
    name: 'Proxy', // Название сущности
    tableName:"proxy",
    columns: {
        id: {
            type: 'int',
            primary: true,
            generated: 'increment', // Автоинкремент
            nullable: false,
        },
        type: {
            type: 'enum',
            enum: EnumProxyType, // Привязка к enum
            nullable: false,
        },
        login: {
            type: 'varchar',
            nullable: false,
        },
        password: {
            type: 'varchar',
            nullable: false,
        },
        ip: {
            type: 'varchar',
            nullable: false,
        },
        host: {
            type: 'varchar',
            nullable: false,
        },
        port: {
            type: 'int',
            nullable: false,
        },
        avail: {
            type: 'boolean',
            nullable: false,
            default: true, // Значение по умолчанию
        },
    },
});
