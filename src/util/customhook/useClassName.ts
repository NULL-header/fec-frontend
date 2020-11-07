import { useMemo } from "react";
import { makeClassName } from "src/util";

export const useClassName = (...names: (string | undefined)[]) =>
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useMemo(() => makeClassName(...names), names);
