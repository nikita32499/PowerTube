// import { EnumProxyType, TProxy } from 'shared-vpn-master';
// import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
