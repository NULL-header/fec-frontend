import React, { memo, useEffect, useRef } from "react";
// eslint-disable-next-line no-unused-vars
import { HadChildComponentProps, RefComponentProps } from "src/util/types";
// eslint-disable-next-line no-unused-vars
import { Validate, ValidatedResult } from "src/util/components/types";
import { passValueRef } from "src/util";

interface WithValidateProps
  extends HadChildComponentProps<RefComponentProps<() => string>> {
  validate: Validate;
}

const NotYetWithValidate = React.forwardRef<
  () => ValidatedResult,
  WithValidateProps
>((props, ref) => {
  const transfer = useRef<() => string>(undefined as any);
  useEffect(() => {
    const getValidatedResult = () => {
      const value = transfer.current();
      return props.validate(value);
    };
    passValueRef(ref, getValidatedResult);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, props.validate]);
  return React.cloneElement(props.children, {
    ref: transfer,
    className: props.className,
  });
});

const WithValidate = memo(NotYetWithValidate);
WithValidate.displayName = "WithValidate";

export { WithValidate };
