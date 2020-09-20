// eslint-disable-next-line no-unused-vars
import { Ref } from "./types";

export const getRefSetter = <T>(ref: Ref<T>) => {
  if (ref == null) throw new Error("Pass ref");
  let refSetter = ref as NonNullable<typeof ref>;
  if (typeof ref !== "function") refSetter = (e: T) => (ref.current = e);
  return refSetter as (instance: T) => void;
};
