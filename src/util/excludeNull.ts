export const excludeNull = function <T>(arg: T) {
  if (arg == null) throw new Error("This value includes null");
  return arg as NonNullable<T>;
};
