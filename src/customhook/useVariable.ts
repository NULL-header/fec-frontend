// eslint-disable-next-line no-unused-vars
import React, { useMemo } from "react";

export const useVariable = <T>(valiable: T) => {
  return useMemo(() => valiable, [valiable]);
};
