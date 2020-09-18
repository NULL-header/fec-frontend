import React, { memo, useEffect, useMemo, useRef } from "react";
// eslint-disable-next-line no-unused-vars
import { Ref, HadChildComponentProps, RefComponentProps } from "../types";
import { decideMutableRef } from "..";

interface RefPropertyControllProps
  extends HadChildComponentProps<RefComponentProps> {
  propertyName: string;
}

const initCurrent = function <T>(current: T) {
  let initialValue = current;
  if (current == null) initialValue = {} as T;
  return initialValue as NonNullable<T>;
};

const NotYetRefPropertyControll = React.forwardRef(
  (props: RefPropertyControllProps, ref: Ref<Record<string, unknown>>) => {
    const transfer = useRef<unknown>(undefined as any);
    const mutableRef = useMemo(() => decideMutableRef(ref), [ref]);

    useEffect(() => {
      mutableRef.current = initCurrent(mutableRef.current);
      mutableRef.current[props.propertyName] = transfer.current;
    }, [mutableRef, props.propertyName]);

    return React.cloneElement(props.children, {
      ref: transfer,
      className: props.className,
    });
  }
);

const RefPropertyControll = memo(NotYetRefPropertyControll);
RefPropertyControll.displayName = "RefPropertyControll";

export { RefPropertyControll };
