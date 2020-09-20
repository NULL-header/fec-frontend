// eslint-disable-next-line no-unused-vars
import React from "react";
import { isMutableRef } from "./isMutableRef";
// eslint-disable-next-line no-unused-vars
import { Ref } from "./types";

export const decideMutableRef = <T>(
  ref: Ref<T>
): React.MutableRefObject<T | null> => {
  if (!isMutableRef(ref)) throw new Error("Pass mutable ref");
  return ref;
};
