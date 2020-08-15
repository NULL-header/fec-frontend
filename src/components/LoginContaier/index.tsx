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
  emailTip: string;
  passwordTip: string;
}

export const LoginContainer: React.FC<LoginContainerProps> = (props) => {
  const inputs = useRef([] as HTMLInputElement[]);
  const inputRefFuncs = [
    ...Array(2).keys(),
  ].map((_, i) => (el: HTMLInputElement) => (inputs.current[i] = el));

  const [history, setHistory] = useState([
    { isShow: false, emailTip: "", passwordTip: "" },
  ] as History);
  const current = history[history.length - 1];
  const inputType = current.isShow ? "text" : "password";

  const insertHisotry = (arg: loginFormData) => {
    const next = update(history, { $push: [arg] });
    setHistory(next);
  };

  const onClickEye = () => {
    const next = update(current, {
      isShow: { $set: !current.isShow },
    });
    insertHisotry(next);
  };
  const reflectWarning = (emailDetail: string, passwordDetail: string) => {
    const next = update(current, {
      emailTip: { $set: emailDetail },
      passwordTip: { $set: passwordDetail },
    });
    insertHisotry(next);
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const [email, password] = inputs.current.map((e) => e.value);
    const [emailValidate, passwordValidate] = validateData(email, password);
    reflectWarning(emailValidate.detail, passwordValidate.detail);
    if (!(emailValidate.passCheck && passwordValidate.passCheck)) return;
  };

  return (
    <form onSubmit={onSubmit} className={props.className}>
      <InputPlace
        tip="mocktip"
        label={current.emailTip}
        type="TextField"
        ref={inputRefFuncs[0]}
      >
        <Email />
      </InputPlace>
      <InputPlace
        tip="mocktip"
        label={current.passwordTip}
        type={inputType}
        ref={inputRefFuncs[1]}
      >
        <VpnKey />
        <ToggleEyeIcon onClick={onClickEye} isShow={current.isShow} />
      </InputPlace>
      <Button variant="outlined" type="submit">
        送信
      </Button>
    </form>
  );
};

interface varidationResult {
  detail: string;
  passCheck: boolean;
}

const validateData = (email: string, password: string) => {
  return [validateEmail(email), validatePassword(password)];
};

const validateEmail = (email: string): varidationResult => {
  const reg = /^[\w+-.]+@[a-z\d-]+(.[a-z\d-]+)*.[a-z]+$/i;
  const passCheckLength = email.length <= 255;
  const passCheckRegular = reg.test(email);
  const passCheck = passCheckLength && passCheckRegular;
  const detail = passCheckLength
    ? passCheckRegular
      ? ""
      : "メールアドレスの形式が不正です"
    : "メールアドレスが長すぎます";
  return { passCheck, detail };
};

const validatePassword = (password: string): varidationResult => {
  const passCheckLength = password.length >= 6;
  const passCheck = passCheckLength;
  const detail = passCheckLength ? "" : "パスワードが短すぎます";
  return { passCheck, detail };
};
