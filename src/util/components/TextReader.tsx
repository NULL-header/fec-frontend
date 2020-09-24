import React, { memo, useEffect, useRef } from "react";
// eslint-disable-next-line no-unused-vars
import { HadChildComponentProps, RefComponentProps } from "src/util/types";
import { passValueRef } from "src/util/passValueRef";

const NotYetTextReader = React.forwardRef<
  () => string,
  HadChildComponentProps<RefComponentProps>
>((props, ref) => {
  const transfer = useRef<HTMLInputElement>(undefined as any);

  useEffect(() => {
    passValueRef(ref, () => transfer.current.value);
  }, [ref]);

  return React.cloneElement(props.children, {
    className: props.className,
    ref: transfer,
  });
});

const TextReader = memo(NotYetTextReader);
TextReader.displayName = "TextReader";

export { TextReader };
