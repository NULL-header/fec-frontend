import React, { useMemo } from "react";

export const useVariable = <T>(valiable: T) => {
  return useMemo(() => valiable, [valiable]);
};
