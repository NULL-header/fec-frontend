import React, { useState, useCallback, useMemo, memo } from "react";
import VpnKey from "@material-ui/icons/VpnKey";

// eslint-disable-next-line no-unused-vars
import { BaseInput } from "./BaseInput";
import { ToggleEyeIcon } from "../ToggleEyeIcon";
// eslint-disable-next-line no-unused-vars
import { GetRisedData } from "./index";

type PasswordInputProps = BaseComponentProps;

const NotYetPasswordInput = React.forwardRef<GetRisedData, PasswordInputProps>(
  (props, ref) => {
    const [[isShown], setisShown] = useState([false]);

    const onClick = useCallback(() => {
      setisShown([!isShown]);
    }, [isShown]);

    const inputType = useMemo(() => toggleType(isShown), [isShown]);

    return (
      <BaseInput {...{ ref, validate, type: inputType, label: "Password" }}>
        <VpnKey />
        <ToggleEyeIcon {...{ onClick, isShown }} />
      </BaseInput>
    );
  }
);

const toggleType = (isShown: boolean) => (isShown ? "text" : "password");

const validate = (password: string): string => {
  const passCheckLength = password.length >= 6;
  const detail = passCheckLength ? "Password" : "パスワードが短すぎます";
  return detail;
};

export const PasswordInput = memo(NotYetPasswordInput);
