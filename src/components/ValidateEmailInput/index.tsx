import React, { memo, useMemo } from "react";
import Email from "@material-ui/icons/Email";

// eslint-disable-next-line no-unused-vars
import { ValidateBaseInput } from "../ValidateBaseInput";

const label = "Email";

type ValidateEmailInputProps = BaseComponentProps;

const NotYetValidateEmailInput = React.forwardRef<
  RaisedRecord,
  ValidateEmailInputProps
>((props, ref) => {
  const className = useMemo(() => props.className, [props.className]);

  return (
    <ValidateBaseInput
      {...{
        className,
        validate,
        ref,
        type: "text",
        label,
      }}
    >
      <Email />
    </ValidateBaseInput>
  );
});

const validate = (email: string): string => {
  const reg = /^[\w+-.]+@[a-z\d-]+(.[a-z\d-]+)*.[a-z]+$/i;
  const isEmpty = email.length > 0;
  const passCheckLength = email.length <= 255;
  const passCheckRegular = reg.test(email);
  const detail = isEmpty
    ? passCheckLength
      ? passCheckRegular
        ? "Email"
        : "メールアドレスの形式が不正です"
      : "メールアドレスが長すぎます"
    : "入力欄が空です";
  return detail;
};

const ValidateEmailInput = memo(NotYetValidateEmailInput);
ValidateEmailInput.displayName = "ValidateEmailInput";

export { ValidateEmailInput };
