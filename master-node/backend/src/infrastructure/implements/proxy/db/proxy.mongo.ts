import { EnumProxyType } from 'core/types/proxy.entities';
import { SchemaMongoose } from 'infrastructure/libs/mongo/mongo';
import { Schema } from 'mongoose';
import { TProxy } from 'shared-vpn-master';

export const MongoSchemaProxy = new Schema<TProxy>({
    id: { type: Number, required: true },
    type: { type: String, enum: Object.values(EnumProxyType), required: true },
    login: { type: String, required: true },
    password: { type: String, required: true },
    ip: { type: String, required: true },
    host: { type: String, required: true },
    port: { type: Number, required: true },
    avail: { type: Boolean, default: true },
} satisfies SchemaMongoose<TProxy>);
