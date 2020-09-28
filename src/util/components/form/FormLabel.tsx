import React, { memo } from "react";
// eslint-disable-next-line no-unused-vars
import { HadChildComponentProps } from "src/util/types";

const NotYetFormLabel = React.forwardRef<unknown, HadChildComponentProps>(
  (props, ref) => {
    return React.cloneElement(props.children, {
      className: props.className,
    });
  }
);

const FormLabel = memo(NotYetFormLabel);
FormLabel.displayName = "FormLabel";

export { FormLabel };
