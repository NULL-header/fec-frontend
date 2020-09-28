import React, { memo, useMemo } from "react";
import {
  // eslint-disable-next-line no-unused-vars
  Ref,
  // eslint-disable-next-line no-unused-vars
  HadChildComponentProps,
  // eslint-disable-next-line no-unused-vars
  RefComponentProps,
  // eslint-disable-next-line no-unused-vars
  Validate,
  // eslint-disable-next-line no-unused-vars
  ValidatedResult,
} from "src/util/types";
import { RefPropertyControll, TextReader, WithValidate } from "..";
import { useOptionalVariable } from "src/util/customhook";

interface FormInputProps extends HadChildComponentProps<RefComponentProps> {
  propertyName: string;
  validate?: Validate;
}

const NotYetFormInput = React.forwardRef<
  Record<string, () => ValidatedResult>,
  FormInputProps
>((props, ref) => {
  const rootProps = {
    propertyName: props.propertyName,
    className: props.className,
    ref,
  };
  const validate = useOptionalVariable(props.validate, () => true);

  return (
    <RefPropertyControll {...rootProps}>
      <WithValidate {...{ validate }}>
        <TextReader>{props.children}</TextReader>
      </WithValidate>
    </RefPropertyControll>
  );
});

const FormInput = memo(NotYetFormInput);
FormInput.displayName = "FormInput";

export { FormInput };
