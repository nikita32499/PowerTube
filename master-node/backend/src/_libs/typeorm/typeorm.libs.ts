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
