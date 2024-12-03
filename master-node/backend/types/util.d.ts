declare global {
    type PromisifyMethods<T> = {
        [K in keyof T]: T[K] extends (...args: infer A) => infer R
            ? (...args: A) => Promise<R>
            : T[K];
    };
}

export {};
