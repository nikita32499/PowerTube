import { Schema } from 'mongoose';

export type SchemaMongoose<T> = {
    [K in keyof T]: T[K] extends Array<infer El>
        ? { type: [Schema<El>]; required: boolean }
        : T[K] extends object
          ?
                | SchemaMongoose<T[K]>
                | { type: Schema<T[K]>; required: boolean; default?: any }
          : T[K] extends number
            ? { type: NumberConstructor; default?: number; required: boolean }
            : T[K] extends boolean
              ? { type: BooleanConstructor; default?: boolean; required: boolean }
              : T[K] extends string
                ? {
                      type: StringConstructor;
                      default?: string;
                      required: boolean;
                      enum?: T[K][];
                  }
                : any;
};
