import { useEffect } from "react";
import { useDidMounted, useIsMounted } from ".";

export const useAbortableEffect = (
  func: (isMounted: () => boolean, didMounted: () => boolean) => any,
  abort: () => void,
  deps: React.DependencyList | undefined
) => {
  const isMounted = useIsMounted();
  const didMounted = useDidMounted();

  useEffect(() => {
    func(isMounted, didMounted);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  // unmount
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => abort, []);
};
