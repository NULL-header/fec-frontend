import React from "react";
import { useAbortableEffect } from "./useAbortableEffect";
// eslint-disable-next-line no-unused-vars
import { FecApiWrapper } from "../FecApiWrapper";

export const useApi = (
  func: (isMounted: () => boolean, didMounted: () => boolean) => any,
  api: FecApiWrapper,
  deps: React.DependencyList | undefined
) => {
  useAbortableEffect(func, api.stopComunicateAll, deps);
};
