export type PartialAndUndefined<OBJ extends object> = {
    [K in keyof OBJ]?: OBJ[K] | undefined;
};

export type Pretty<T> = T extends object
    ? {
          [K in keyof T]: T[K] extends object ? Pretty<T[K]> : T[K];
      }
    : T extends Array<infer Element>
    ? Pretty<Element>[]
    : T;

export type IsEqual<A, B> = (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B
    ? 1
    : 2
    ? true
    : never;

export type DeepReadonly<T> = T extends object
    ? {
          readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
      }
    : T extends Array<infer Element>
    ? ReadonlyArray<Element>[]
    : Readonly<T>;
