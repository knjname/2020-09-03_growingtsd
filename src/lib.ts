export type ItemDefinitions<D = {}> = {
  define<T>(args: T): ItemDefinitions<D & { [P in keyof T]: T[P] }>;
  rawData: D;
};

export const item0: ItemDefinitions = {} as any;

export const recurse = <T>(itemDef: ItemDefinitions<T>) =>
  itemDef.define({
    a: itemDef,
    b: itemDef,
  });
