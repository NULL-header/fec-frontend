import React, { useRef, useState, useCallback, useMemo, memo } from "react";
import { Grid, Button } from "@material-ui/core";
import update from "immutability-helper";

import { ValidateEmailInput, ValidatePasswordInput } from "src/components";
import { FecApiWrapper } from "src/FecApiWrapper";
import { useDidMountEffect } from "src/customhook";

import { WarningState } from "./WarningState";

import { useStyles } from "./style";

type LoginContainerProps = BaseComponentProps;

type WarningKey = "noCommunicate" | "missAuth";

interface GetMethods extends Record<string, GetRaisedData> {
  Email: GetRaisedData;
  Password: GetRaisedData;
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

const defaultRaisedData: RaisedData = {
  isRegular: true,
  value: "",
};

const defaultGetMethods: GetMethods = {
  Email: () => defaultRaisedData,
  Password: () => defaultRaisedData,
};

const api = new FecApiWrapper();

const NotYetLoginContainer: React.FC<LoginContainerProps> = (props) => {
  const getMethods = useRef(defaultGetMethods);

  const [history, setHistory] = useState([
    {
      isShownnLabel: false,
      warningKey: "noCommunicate",
      info: { email: "", password: "" },
    } as LoginFormData,
  ]);
  const current = useMemo(() => history[history.length - 1], [history]);

  const classes = useStyles();

  let insertHistory = useCallback(
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
      const email = currentInfo.Email();
      const password = currentInfo.Password();
      if (!validate(email, password)) return;
      const next = {
        isShownnLabel: false,
        info: { email: email.value, password: password.value },
      } as LoginFormData;
      insertHistory(next);
    },
    [insertHistory]
  );

  useDidMountEffect(
    async () => {
      const { email, password } = current.info;
      const res = await api.login({ email, password }).catch((e) => undefined);
      console.log(res);
      const next = { isShownnLabel: true } as LoginFormData;
      if (res == null) {
        next.warningKey = "noCommunicate";
      } else {
        next.warningKey = "missAuth";
      }
      insertHistory(next);
    },
    () => {
      insertHistory = () => null;
      api.stopComunicateAll();
    },
    [current.info]
  );

  return (
    <form onSubmit={onSubmit} className={props.className}>
      <Grid container className={classes.container}>
        <Grid item>
          <WarningState loginFormData={current} />
        </Grid>
        <Grid item>
          <ValidateEmailInput ref={getMethods} />
        </Grid>
        <Grid item>
          <ValidatePasswordInput ref={getMethods} />
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

const validate = (email: RaisedData, password: RaisedData) => {
  return email.isRegular && password.isRegular;
};

const LoginContainer = memo(NotYetLoginContainer);
LoginContainer.displayName = "LoginContainer";

export { LoginContainer };
