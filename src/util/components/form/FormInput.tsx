import React, { memo } from "react";
// eslint-disable-next-line no-unused-vars
import { HadChildComponentProps, RefComponentProps } from "src/util/types";
// eslint-disable-next-line no-unused-vars
import { Validate, ValidatedResult } from "src/util/components/types";
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
  const validate = useOptionalVariable(props.validate, (value: string) => ({
    isRegular: true,
    value,
  }));

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
