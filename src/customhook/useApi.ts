// eslint-disable-next-line no-unused-vars
import React from "react";

import { useAbortableEffect } from "src/util/customhook";
// eslint-disable-next-line no-unused-vars
import { FecApiWrapper } from "src/FecApiWrapper";

export const useApi = (
  func: (isMounted: () => boolean, didMounted: () => boolean) => any,
  api: FecApiWrapper,
  deps: React.DependencyList | undefined
) => {
  useAbortableEffect(func, api.stopComunicateAll.bind(api), deps);
};
