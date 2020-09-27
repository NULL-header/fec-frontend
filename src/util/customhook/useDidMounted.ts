import { useCallback, useEffect, useRef } from "react";

export const useDidMounted = () => {
  const mountedRef = useRef(0);
  const getDidMounted = () => mountedRef.current > 1;
  useEffect(() => {
    if (!getDidMounted()) mountedRef.current += 1;
  });

  return useCallback(getDidMounted, []);
};
