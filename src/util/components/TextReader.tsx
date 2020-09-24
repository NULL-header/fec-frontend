import React, { memo, useRef } from "react";
// eslint-disable-next-line no-unused-vars
import { HadChildComponentProps, RefComponentProps } from "../types";

const NotYetTextReader = React.forwardRef<
  string,
  HadChildComponentProps<RefComponentProps>
>((props, ref) => {
  const transfer = useRef<HTMLInputElement>(undefined as any);

  return React.cloneElement(props.children, {
    className: props.className,
    ref: transfer,
  });
});

const TextReader = memo(NotYetTextReader);
TextReader.displayName = "TextReader";

export { TextReader };
