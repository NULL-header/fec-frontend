import React, { useState, useCallback } from "react";
import VpnKey from "@material-ui/icons/VpnKey";

// eslint-disable-next-line no-unused-vars
import { BaseInput } from "./BaseInput";
import { ToggleEyeIcon } from "../ToggleEyeIcon";
// eslint-disable-next-line no-unused-vars
import { GetRisedData } from "./index";

type PasswordInputProps = BaseComponentProps;

export const PasswordInput = React.forwardRef<GetRisedData, PasswordInputProps>(
  (props, ref) => {
    const [[isShow], setIsShow] = useState([false]);
    const onClick = useCallback(() => {
      setIsShow([!isShow]);
    }, [isShow]);
    return (
      <BaseInput
        label="Password"
        {...{ varidate, ref, type: inputType(isShow) }}
      >
        <VpnKey />
        <ToggleEyeIcon {...{ isShow, onClick }} />
      </BaseInput>
    );
  }
);

const inputType = (isShow: boolean) => (isShow ? "text" : "password");

const varidate = (password: string): string => {
  const passCheckLength = password.length >= 6;
  const detail = passCheckLength ? "Password" : "パスワードが短すぎます";
  return detail;
};
