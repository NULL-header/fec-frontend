import { useMemo } from "react";

export const useOptionalVariable = <T, U>(
  optional: T | undefined,
  replace: U
) => {
  return useMemo(() => (optional == null ? replace : (optional as T)), [
    optional,
    replace,
  ]);
};
