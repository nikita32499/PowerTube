import { Document, Schema, model } from 'mongoose';

// Enum для типа прокси
export enum EnumProxyType {
    HTTP = 'http',
    SOCKS5 = 'socks5',
    HTTPS = 'https',
}

// Тип для объекта TProxy
type TProxy = {
    id: number;
    type: EnumProxyType;
    login: string;
    password: string;
    ip: string;
    host: string;
    port: number;
    avail: boolean;
    obj: {
        attr1: number;
        attr2: string;
    };
};

// Типы для поля схемы
type FieldType<T> = T extends StringConstructor
    ? { type: StringConstructor; required?: boolean; enum?: string[]; default?: string }
    : T extends NumberConstructor
      ? { type: NumberConstructor; required?: boolean; enum?: number[]; default?: number }
      : T extends BooleanConstructor
        ? { type: BooleanConstructor; required?: boolean; default?: boolean }
        : T extends object
          ? { type: Schema<any>; required?: boolean; default?: any }
          : { type: any; required?: boolean; enum?: any[]; default?: any };

// Рекурсивная схема для Mongoose, проверяющая вложенные объекты
type SchemaMongoose<T> = {
    [K in keyof T]: T[K] extends object
        ? T[K] extends Array<any>
            ? FieldType<T[K]> // Для массивов можно применить тип FieldType
            : SchemaMongoose<T[K]> // Рекурсивно вызываем для вложенных объектов
        : FieldType<T[K]>; // Применяем типы для всех остальных полей
};

// Пример схемы для TProxy с проверкой типов
const ProxySchema = new Schema<SchemaMongoose<TProxy>>({
    id: { type: Number, required: true },
    type: { type: String, enum: Object.values(EnumProxyType), required: true },
    login: { type: String, required: true },
    password: { type: String, required: true },
    ip: { type: String, required: true },
    host: { type: String, required: true },
    port: { type: Number, required: true },
    avail: { type: Boolean, default: true },
    obj: {
        attr1: { type: Number, required: true },
        attr2: { type: String, required: true },
    },
});

// Модель для прокси
const ProxyModel = model<TProxy & Document>('Proxy', ProxySchema);

export { EnumProxyType, ProxyModel };
