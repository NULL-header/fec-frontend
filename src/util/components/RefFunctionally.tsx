// Use if the warning occured.
// It is like "use createRef or Ref-setter."
// So, this is to transform RefMutableObject from useRef to Ref-setter.

import React, { memo, useMemo } from "react";
// eslint-disable-next-line no-unused-vars
import { HadChildComponentProps, RefComponentProps } from "../types";
import { getRefSetter } from "..";

const NotYetRefFunctionally = React.forwardRef<
  unknown,
  HadChildComponentProps<RefComponentProps>
>((props, ref) => {
  const refSetter = useMemo(() => getRefSetter(ref), [ref]);
  return React.cloneElement(props.children, {
    ref: refSetter,
    className: props.className,
  });
});

const RefFunctionally = memo(NotYetRefFunctionally);
RefFunctionally.displayName = "RefFanctionally";

export { RefFunctionally };
