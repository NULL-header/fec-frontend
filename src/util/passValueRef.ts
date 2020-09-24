// eslint-disable-next-line no-unused-vars
import { Ref } from "./types";

export const passValueRef = <T>(ref: Ref<T>, value: T) => {
  if (ref == null) throw new Error("pass ref");
  else if (typeof ref === "function") ref(value);
  else ref.current = value;
};
