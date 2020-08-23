import React, { useState, useCallback, useMemo, memo } from "react";
import VpnKey from "@material-ui/icons/VpnKey";

// eslint-disable-next-line no-unused-vars
import { ValidateBaseInput } from "../ValidateBaseInput";
import { ToggleEyeIcon } from "../ToggleEyeIcon";

const label = "Password";

type ValidatePasswordInputProps = BaseComponentProps;

const NotYetValidatePasswordInput = React.forwardRef<
  RaisedRecord,
  ValidatePasswordInputProps
>((props, ref) => {
  const [[isShown], setisShown] = useState([false]);

  const onClick = useCallback(() => {
    setisShown([!isShown]);
  }, [isShown]);

  const inputType = useMemo(() => toggleType(isShown), [isShown]);

  const className = useMemo(() => props.className, [props.className]);

  return (
    <ValidateBaseInput
      {...{
        className,
        ref,
        validate,
        type: inputType,
        label,
      }}
    >
      <VpnKey />
      <ToggleEyeIcon {...{ onClick, isShown }} />
    </ValidateBaseInput>
  );
});

const toggleType = (isShown: boolean) => (isShown ? "text" : "password");

const validate = (password: string): string => {
  const passCheckLength = password.length >= 6;
  const detail = passCheckLength ? "Password" : "パスワードが短すぎます";
  return detail;
};

const ValidatePasswordInput = memo(NotYetValidatePasswordInput);
ValidatePasswordInput.displayName = "ValidatePasswordInput";

export { ValidatePasswordInput };
