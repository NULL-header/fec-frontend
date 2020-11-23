export const getObjKeys = <T extends Record<string, any>>(obj: T) =>
  Object.keys(obj) as (keyof T)[];
