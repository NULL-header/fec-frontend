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
    const [[isShow], setIsShow] = useState([false]);

    const onClick = useCallback(() => {
      setIsShow([!isShow]);
    }, [isShow]);

    const inputType = useMemo(() => toggleType(isShow), [isShow]);

    return (
      <BaseInput {...{ varidate, type: inputType, label: "Password" }}>
        <VpnKey />
        <ToggleEyeIcon {...{ onClick, isShow }} />
      </BaseInput>
    );
  }
);

const toggleType = (isShow: boolean) => (isShow ? "text" : "password");

const varidate = (password: string): string => {
  const passCheckLength = password.length >= 6;
  const detail = passCheckLength ? "Password" : "パスワードが短すぎます";
  return detail;
};

export const PasswordInput = memo(NotYetPasswordInput);
