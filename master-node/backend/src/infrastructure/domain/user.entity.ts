import { TypeormLib } from '_libs/typeorm/typeorm.libs';
import { ProxyModel } from 'infrastructure/domain/proxy.entity';
import { EnumUserRole, TSubscription, TUser, TUserAuth } from 'shared-vpn-master';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserModel implements TUser {
    @PrimaryGeneratedColumn()
    declare id: number;

    @Column('string', { nullable: true, unique: true })
    declare email: string | null;

    @Column({ type: 'enum', enum: EnumUserRole, default: EnumUserRole.USER })
    declare role: EnumUserRole;

    @Column({
        type: 'bigint',
        default: null,
        transformer: new TypeormLib.ColumnBigIntTransformer(),
        nullable: true,
    })
    declare lastAt: number | null;

    @Column({
        type: 'bigint',
        default: () => Date.now().toString(),
        transformer: new TypeormLib.ColumnBigIntTransformer(),
    })
    declare createdAt: number;

    @Column({
        type: 'jsonb',
    })
    declare subscription: TSubscription;

    @OneToOne(() => ProxyModel, { eager: true })
    declare proxy: ProxyModel | null;

    @Column('jsonb')
    declare auth: TUserAuth;

    @Column('number', { default: 0 })
    declare jwtVersion: number;
}
