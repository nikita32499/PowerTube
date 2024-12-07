import { TPayment } from 'core/types/payment.entities';
import {
    EntitySchema,
    EntitySchemaColumnOptions,
    EntitySchemaEmbeddedColumnOptions,
    EntitySchemaOptions,
} from 'typeorm';

class _TypeormLib_ {
    ColumnBigIntTransformer = class {
        public to(data: number): number {
            return data;
        }

        public from(data: string): number {
            return parseInt(data);
        }
    };
}

export const TypeormLib = new _TypeormLib_();

export function isUpdateSuccess<T extends { affected?: number | null | undefined }>(
    result: T,
): boolean {
    return typeof result.affected === 'number' && result.affected > 0 ? true : false;
}


/*






*/

type SchemaColumnType<T> =
    T extends Array<infer El>
    ? never
    : T extends object
    ? { type: 'jsonb' }
    : T extends string
    ? { type: 'text' | 'varchar' } | { type: 'enum'; enum: object }
    : T extends number
    ? { type: 'int' | 'bigint' }
    :T extends boolean?{
        type: 'boolean'
    }: any;



export class EntitySchemaTyped<T, Embedds extends keyof T | '' = ''> extends EntitySchema<T> {
    constructor(schema: SchemaTypeOrmVariant<T, Embedds>) {
        super(schema);
    }
}


type SchemaTypeOrmVariant<T, Embedds extends keyof T | '' = ''> = {


    columns: {
        [K in Exclude<keyof T, Embedds>]: (SchemaColumnType<Exclude<T[K], null>> & {
            nullable: null extends T[K] ? true : false;
            default?: T[K];
        } & EntitySchemaColumnOptions)
    }

} & (Embedds extends keyof T ? {
    embeddeds: {
        [K in Embedds]: (T[K] extends Array<infer El>?{
            schema: EntitySchemaTyped<El>
            array:true
        }:{
            schema: EntitySchemaTyped<T[K]>
        }) & EntitySchemaEmbeddedColumnOptions;
    }
} : {
    }) & EntitySchemaOptions<T>




