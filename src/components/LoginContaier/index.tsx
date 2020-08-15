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
  emailLabel: string;
  passwordLabel: string;
}

export const LoginContainer: React.FC<LoginContainerProps> = (props) => {
  const inputs = useRef([] as HTMLInputElement[]);
  const inputRefFuncs = [
    ...Array(2).keys(),
  ].map((_, i) => (el: HTMLInputElement) => (inputs.current[i] = el));

  const [history, setHistory] = useState([
    { isShow: false, emailLabel: "Email", passwordLabel: "Password" },
  ] as History);
  const current = history[history.length - 1];
  const inputType = current.isShow ? "text" : "password";
  const emailWarning = current.emailLabel !== "Email";
  const passwordWarning = current.passwordLabel !== "Password";

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
    const emailLabel = isLongerThan0(emailDetail) ? emailDetail : "Email";
    const passwordLabel = isLongerThan0(passwordDetail)
      ? passwordDetail
      : "Password";
    const next = update(current, {
      emailLabel: { $set: emailLabel },
      passwordLabel: { $set: passwordLabel },
    });
    insertHisotry(next);
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const [email, password] = inputs.current.map((e) => e.value);
    const [emailValidate, passwordValidate] = validateData(email, password);
    reflectWarning(emailValidate.detail, passwordValidate.detail);
    if (!(emailValidate.passCheck && passwordValidate.passCheck)) return;
    // TODO add ajax comunicate
  };

  return (
    <form onSubmit={onSubmit} className={props.className}>
      <InputPlace
        label={current.emailLabel}
        type="TextField"
        ref={inputRefFuncs[0]}
        error={emailWarning}
      >
        <Email />
      </InputPlace>
      <InputPlace
        label={current.passwordLabel}
        type={inputType}
        ref={inputRefFuncs[1]}
        error={passwordWarning}
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

const isLongerThan0 = (arg: string) => arg.length > 0;
