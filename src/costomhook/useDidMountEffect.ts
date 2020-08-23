// eslint-disable-next-line no-unused-vars
import React, { useEffect, useRef } from "react";

type effectFunc = () => Promise<unknown>;

export const useDidMountEffect = (
  func: effectFunc,
  deps: React.DependencyList | undefined
) => {
  const doesMount = useRef(false);

  useEffect(() => {
    if (doesMount.current) func();
    else doesMount.current = true;
    // func is a function, so this is not included deps
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};
