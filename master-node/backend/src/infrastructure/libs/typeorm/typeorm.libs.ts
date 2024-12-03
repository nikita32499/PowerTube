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
