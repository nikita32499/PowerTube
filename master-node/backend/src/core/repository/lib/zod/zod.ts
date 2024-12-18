import { z } from 'zod';

export const clearOptional = (data: Record<string, unknown>) => {
    Object.keys(data).forEach((key) => {
        if (data[key] === undefined) {
            delete data[key];
        }
    });
    return data;
};

export const ZodSafe = <Z extends z.ZodType>(schema: Z): ZodSafeBuilder<Z> =>
    new ZodSafeBuilderImpl(schema);

export type Exactly<T> = Ref<T>;
export type Super<T> = {
    get: /* no shorthands, variance is loose with shorthands! */ () => T;
};
export type Extends<T> = {
    set: /* no shorthands, variance is loose with shorthands! */ (value: T) => void;
};
export type Type<T> = {
    get?: /* no shorthands, variance is loose with shorthands! */ () => T;
    set?: /* no shorthands, variance is loose with shorthands! */ (value: T) => void;
};

export type Ref<T> = {
    get: /* no shorthands, variance is loose with shorthands! */ () => T;
    set: /* no shorthands, variance is loose with shorthands! */ (value: T) => void;
};

class ZodSafeBuilderImpl implements ZodSafeBuilder<any> {
    public constructor(public readonly schema: any) {}
    matches() {
        return this.schema;
    }
    infer() {
        return this.schema;
    }
    input() {
        return this.schema;
    }
    output() {
        return this.schema;
    }
}

export interface ZodSafeBuilder<Z extends z.ZodType> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    matches<
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _ extends {
            infer?: Type<z.infer<Z>>;
            input?: Type<z.input<Z>>;
            output?: Type<z.output<Z>>;
        },
    >(): Z;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    infer<_ extends Type<z.infer<Z>>>(): Z;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    input<_ extends Type<z.input<Z>>>(): Z;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    output<_ extends Type<z.output<Z>>>(): Z;
}
