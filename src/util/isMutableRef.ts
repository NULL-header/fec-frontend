// eslint-disable-next-line no-unused-vars
import { Ref } from "./types";

export const isMutableRef = function <T>(
  ref: Ref<T>
): ref is React.MutableRefObject<T | null> {
  return ref != null && typeof ref !== "function";
};
