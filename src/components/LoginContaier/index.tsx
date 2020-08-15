import React, { useState, useRef } from "react";
import update from "immutability-helper";
import VpnKey from "@material-ui/icons/VpnKey";
import Email from "@material-ui/icons/Email";

import { InputPlace } from "../InputPlace";
import { ToggleEyeIcon } from "../ToggleEyeIcon";
import { Button } from "@material-ui/core";

interface LoginContainerProps extends BaseComponentProps {
  className?: string;
}

type History = loginFormData[];

interface loginFormData {
  isShow: boolean;
}

export const LoginContainer: React.FC<LoginContainerProps> = (props) => {
  const inputs = useRef([] as HTMLInputElement[]);
  const inputRefFuncs = [
    ...Array(2).keys(),
  ].map((_, i) => (el: HTMLInputElement) => (inputs.current[i] = el));

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

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(inputs.current.map((e) => e.value));
  };

  return (
    <form onSubmit={onSubmit} className={props.className}>
      <InputPlace
        tip="mocktip"
        label="Email"
        type="TextField"
        ref={inputRefFuncs[0]}
      >
        <Email />
      </InputPlace>
      <InputPlace
        tip="mocktip"
        label="Password"
        type={inputType}
        ref={inputRefFuncs[1]}
      >
        <VpnKey />
        <ToggleEyeIcon {...{ onClick: onClickEye, isShow }} />
      </InputPlace>
      <Button variant="outlined" type="submit">
        送信
      </Button>
    </form>
  );
};
