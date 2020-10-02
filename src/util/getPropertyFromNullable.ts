export const getPropertyFromNullable = <T, U extends keyof T>(
  nullable: T | undefined,
  propName: U
) => {
  if (nullable == null) {
    return undefined;
  } else {
    return nullable[propName];
  }
};
