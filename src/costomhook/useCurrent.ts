import React, { useMemo } from "react";

export const useCurrent = <T>(
  history: T[],
  index: number = history.length - 1
) => {
  return useMemo(() => history[index], [history, index]);
};
