import React, { memo, useMemo } from "react";
// eslint-disable-next-line no-unused-vars
import { HadChildComponentProps } from "../types";

const NotYetFormLabel = React.forwardRef<unknown, HadChildComponentProps>(
  (props, ref) => {
    const element = useMemo(
      () =>
        React.cloneElement(props.children, {
          className: props.className,
        }),
      [props.className, props.children]
    );
    return element;
  }
);

const FormLabel = memo(NotYetFormLabel);
FormLabel.displayName = "FormLabel";

export { FormLabel };
