declare global {
    type PromisifyMethods<T, Key = ''> = {
        [K in keyof T]: K extends Key
            ? T[K]
            : T[K] extends (...args: infer A) => infer R
              ? (...args: A) => Promise<R>
              : T[K];
    };
}

export {};
