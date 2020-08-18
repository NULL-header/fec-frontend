import React, { useState, useRef } from "react";
import { Grid, Button } from "@material-ui/core";
import update from "immutability-helper";
import VpnKey from "@material-ui/icons/VpnKey";
import Email from "@material-ui/icons/Email";

import { InputPlace } from "../InputPlace";
import { ToggleEyeIcon } from "../ToggleEyeIcon";
import { WarningLabel } from "../WarningLabel";
import { DisplayContainer } from "../DisplayContainer";
import { FecApiWrapper } from "../../FecApiWrapper";
import { useStyles } from "./style";

interface LoginContainerProps extends BaseComponentProps {
  className?: string;
}

type History = loginFormData[];

type WarningKey = "noCommunicate" | "missAuth";

interface loginFormData {
  isShowPassword: boolean;
  emailLabel: string;
  passwordLabel: string;
  isShowLabel: boolean;
  warningKey: WarningKey;
}

const defaultHistory: History = [
  {
    isShowPassword: false,
    emailLabel: "Email",
    passwordLabel: "Password",
    isShowLabel: false,
    warningKey: "noCommunicate",
  },
];

export const LoginContainer: React.FC<LoginContainerProps> = (props) => {
  const inputs = useRef([] as HTMLInputElement[]);
  const inputRefFuncs = [
    ...Array(2).keys(),
  ].map((_, i) => (el: HTMLInputElement) => (inputs.current[i] = el));

  const [history, setHistory] = useState(defaultHistory);
  const current = history[history.length - 1];
  const inputType = current.isShowPassword ? "text" : "password";
  const emailWarning = current.emailLabel !== "Email";
  const passwordWarning = current.passwordLabel !== "Password";
  const api = new FecApiWrapper();
  const classes = useStyles();

  const insertHistory = (arg: loginFormData) => {
    const next = update(history, { $push: [arg] });
    setHistory(next);
  };

  const onClickEye = () => {
    const next = update(current, {
      isShowPassword: { $set: !current.isShowPassword },
    });
    insertHistory(next);
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
    insertHistory(next);
  };

  const setIsShowWarningLabel = (isShow: boolean) => {
    const next = update(current, {
      isShowLabel: { $set: isShow },
    });
    insertHistory(next);
  };

  const setWarningKey = (key: WarningKey) => {
    const next = update(current, {
      warningKey: { $set: key },
    });
    insertHistory(next);
  };

  const validate = (email: string, password: string) => {
    const [emailValidate, passwordValidate] = validateData(email, password);
    reflectWarning(emailValidate.detail, passwordValidate.detail);
    return emailValidate.passCheck && passwordValidate.passCheck;
  };

  const login = async (email: string, password: string) => {
    try {
      const {
        data: { status },
      } = await api.login(email, password);
      if (status == "FAILED") {
        return;
      }
    } catch (e) {
      setWarningKey("noCommunicate");
      setIsShowWarningLabel(true);
    }
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const [email, password] = inputs.current.map((e) => e.value);
    if (!validate(email, password)) return;
    setIsShowWarningLabel(false);
    await login(email, password);
  };

  return (
    <form onSubmit={onSubmit} className={props.className}>
      <Grid container className={classes.container}>
        <Grid item>
          <WarningLabel isShow={current.isShowLabel}>
            <DisplayContainer currentKey={current.warningKey}>
              <div key="noCommunicate">サーバーとの通信が失敗しました。</div>
              <div key="missAuth">
                認証に失敗しました。入力された情報が間違っています。
              </div>
            </DisplayContainer>
          </WarningLabel>
        </Grid>
        <Grid item>
          <InputPlace
            label={current.emailLabel}
            type="TextField"
            ref={inputRefFuncs[0]}
            error={emailWarning}
            className={classes.text}
          >
            <Email />
          </InputPlace>
        </Grid>
        <Grid item>
          <InputPlace
            label={current.passwordLabel}
            type={inputType}
            ref={inputRefFuncs[1]}
            error={passwordWarning}
            className={classes.text}
          >
            <VpnKey />
            <ToggleEyeIcon
              onClick={onClickEye}
              isShow={current.isShowPassword}
            />
          </InputPlace>
        </Grid>
        <Grid item>
          <Button variant="outlined" type="submit" className={classes.button}>
            送信
          </Button>
        </Grid>
      </Grid>
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
