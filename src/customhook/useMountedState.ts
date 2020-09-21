// eslint-disable-next-line no-unused-vars
import React, { useRef, useEffect, useCallback } from "react";

export const useMountedState = () => {
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;
    };
  }, []);

  return useCallback(() => mountedRef.current, []);
};
