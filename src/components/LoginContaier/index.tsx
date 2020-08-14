import React, { useState } from "react";
import { FormControl } from "@material-ui/core";
import update from "immutability-helper";
import VpnKey from "@material-ui/icons/VpnKey";
import Email from "@material-ui/icons/Email";

import { InputPlace } from "../InputPlace";
import { ToggleEyeIcon } from "../ToggleEyeIcon";

interface LoginContainerProps extends BaseComponent {
  className?: string;
}

type History = loginFormData[];

interface loginFormData {
  isShow: boolean;
}

export const LoginContainer: React.FC<LoginContainerProps> = (props) => {
  const [history, setHistory] = useState([{ isShow: false }] as History);
  const current = history[history.length - 1];
  const isShow = current.isShow;
  const inputType = isShow ? "text" : "password";

  const insertHisotry = (arg: loginFormData) => {
    const next = update(history, { $push: [arg] });
    setHistory(next);
  };

  const onClickEye = () => {
    const next = update(current, {
      isShow: { $set: !isShow },
    });
    insertHisotry(next);
  };

  return (
    <div className={props.className}>
      <FormControl>
        <InputPlace tip="mocktip" label="mocklabel" type="TextField">
          <Email />
        </InputPlace>
        <InputPlace tip="mocktip" label="mocklabel" type={inputType}>
          <VpnKey />
          <ToggleEyeIcon {...{ onClick: onClickEye, isShow }} />
        </InputPlace>
      </FormControl>
    </div>
  );
};
