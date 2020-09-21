import React, { memo, useEffect, useMemo, useRef } from "react";
// eslint-disable-next-line no-unused-vars
import { Ref, HadChildComponentProps, RefComponentProps } from "../types";
import { getRefSetter, decideMutableRef } from "..";

interface FormInputProps extends HadChildComponentProps<RefComponentProps> {
  propertyName: string;
}

const initCurrent = function <T>(current: T) {
  let initialValue = current;
  if (current == null) initialValue = {} as T;
  return initialValue as NonNullable<T>;
};

const NotYetFormInput = React.forwardRef(
  (props: FormInputProps, ref: Ref<Record<string, unknown>>) => {
    const transfer = useRef<unknown>(undefined as any);
    const mutableRef = useMemo(() => decideMutableRef(ref), [ref]);
    const tranferSetter = getRefSetter(transfer);

    useEffect(() => {
      mutableRef.current = initCurrent(mutableRef.current);
      mutableRef.current[props.propertyName] = transfer.current;
    }, [mutableRef, props.propertyName]);

    return React.cloneElement(props.children, {
      ref: tranferSetter,
      className: props.className,
    });
  }
);

const FormInput = memo(NotYetFormInput);
FormInput.displayName = "FormInput";

export { FormInput };
