// use if you want to take an input tag with Ref.
// this can pass a getter to Ref.
// So, you can take this when to want to take value;
// For example, use with a form tag, and call getter
// when the submit event occured.

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
