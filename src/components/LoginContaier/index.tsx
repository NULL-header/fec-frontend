import React, { useRef, useState, useCallback, useMemo, memo } from "react";
import { Grid, Button } from "@material-ui/core";
import update from "immutability-helper";

import { useDoesMountEffect } from "../../costomhook/doesMountEffect";
import { EmailInput } from "./EmailInput";
import { PasswordInput } from "./PasswordInput";
import { WarningState } from "./WarningState";
import { FecApiWrapper } from "../../FecApiWrapper";
import { useStyles } from "./style";

interface LoginContainerProps extends BaseComponentProps {
  className?: string;
}

type WarningKey = "noCommunicate" | "missAuth";

export interface RisedData {
  value: string;
  isRegular: boolean;
}

export type GetRisedData = () => RisedData;

interface GetMethods extends Record<string, GetRisedData> {
  email: GetRisedData;
  password: GetRisedData;
}

interface Info {
  email: string;
  password: string;
}

export interface LoginFormData {
  isShownnLabel: boolean;
  warningKey: WarningKey;
  info: Info;
}

type SetGetMethod = (f: GetRisedData) => void;

interface SetGetMethods extends Record<string, SetGetMethod> {
  email: SetGetMethod;
  password: SetGetMethod;
}

const defaultRisedData: RisedData = {
  isRegular: true,
  value: "",
};

const defaultGetMethods: GetMethods = {
  email: () => defaultRisedData,
  password: () => defaultRisedData,
};

const api = new FecApiWrapper();

const NotYetLoginContainer: React.FC<LoginContainerProps> = (props) => {
  const getMethods = useRef(defaultGetMethods);
  const setGetMethods = useMemo(() => {
    const tmp = {} as SetGetMethods;
    Object.keys(getMethods.current).forEach(
      (e) => (tmp[e] = (f: GetRisedData) => (getMethods.current[e] = f))
    );
    return tmp;
  }, []);

  const [history, setHistory] = useState([
    {
      isShownnLabel: false,
      warningKey: "noCommunicate",
      info: { email: "", password: "" },
    } as LoginFormData,
  ]);
  const current = useMemo(() => history[history.length - 1], [history]);

  const classes = useStyles();

  const insertHistory = useCallback(
    (arg: LoginFormData) => {
      const newCurrent = { ...current, ...arg };
      const next = update(history, { $push: [newCurrent] });
      setHistory(next);
    },
    [history, current]
  );

  const onSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const currentInfo = getMethods.current;
      const email = currentInfo.email();
      const password = currentInfo.password();
      if (!validate(email, password)) return;
      const next = {
        isShownnLabel: false,
        info: { email: email.value, password: password.value },
      } as LoginFormData;
      insertHistory(next);
    },
    [insertHistory]
  );

  useDoesMountEffect(async () => {
    const { email, password } = current.info;
    const res = await api.login(email, password).catch((e) => undefined);
    console.log(res);
    const next = { isShownnLabel: true } as LoginFormData;
    if (res == null) {
      next.warningKey = "noCommunicate";
    } else {
      next.warningKey = "missAuth";
    }
    insertHistory(next);
  }, [current.info]);

  return (
    <form onSubmit={onSubmit} className={props.className}>
      <Grid container className={classes.container}>
        <Grid item>
          <WarningState loginFormData={current} />
        </Grid>
        <Grid item>
          <EmailInput ref={setGetMethods.email} />
        </Grid>
        <Grid item>
          <PasswordInput ref={setGetMethods.password} />
        </Grid>
        <Grid item>
          <Button variant="outlined" type="submit" className={classes.button}>
            log in
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

const validate = (email: RisedData, password: RisedData) => {
  return email.isRegular && password.isRegular;
};

export const LoginContainer = memo(NotYetLoginContainer);
