import { getStringFromNullable } from ".";
export const makeClassName = (...names: (string | undefined)[]) =>
  names
    .slice(1)
    .reduce(
      (a, e) => a + " " + getStringFromNullable(e),
      getStringFromNullable(names[0])
    );
