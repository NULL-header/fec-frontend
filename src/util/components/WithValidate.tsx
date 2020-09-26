import React, { memo, useEffect, useRef } from "react";
import {
  // eslint-disable-next-line no-unused-vars
  HadChildComponentProps,
  // eslint-disable-next-line no-unused-vars
  RefComponentProps,
  // eslint-disable-next-line no-unused-vars
  ValidatedResult,
  // eslint-disable-next-line no-unused-vars
  Validate,
} from "src/util/types";
import { passValueRef } from "src/util";

interface WithValidateProps
  extends HadChildComponentProps<RefComponentProps<() => string>> {
  validate: Validate;
}

const NotYetWithValidate = React.forwardRef<
  () => ValidatedResult,
  WithValidateProps
>((props, ref) => {
  const transfer = useRef(undefined as any);
  useEffect(() => {
    const getValidatedResult = () => {
      const value = transfer.current();
      return {
        isRegular: props.validate(value),
        value,
      };
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
