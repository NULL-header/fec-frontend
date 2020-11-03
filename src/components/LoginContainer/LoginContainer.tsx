import React, { useCallback, useMemo, useState, useContext } from "react";
import { useHistory } from "react-router-dom";

// eslint-disable-next-line no-unused-vars
import { AsyncReturnType } from "src/util/types";
import { useCurrent } from "src/util/customhook";
import { useApi } from "src/customhook";
import { FecApiWrapper, isBadResponse } from "src/FecApiWrapper";
import { LoginStateContext } from "src/components/ContentContainer/context";

// eslint-disable-next-line no-unused-vars
import { Infos, LoginForm } from "./LoginForm";
// eslint-disable-next-line no-unused-vars
import { warning } from "./WarningState";

interface Current {
  infos: Infos;
  isShownLabel: boolean;
  warningKey: warning;
}

const defaultStates = [
  {
    infos: {
      email: "",
      password: "",
    },
    isShownLabel: false,
    warningKey: "noCommunicate",
  } as Current,
];

type Responses = AsyncReturnType<typeof FecApiWrapper.prototype.login>;

const getKeyFromRes = (res: Responses): warning => {
  let key: warning = "unknown";
  if (res == null) key = "noCommunicate";
  else if (isBadResponse(res)) key = "missAuth";
  return key;
};

const Component: React.FC<BaseComponentProps> = (props) => {
  const [states, setStates] = useState(defaultStates);
  const current = useCurrent(states);
  const { warningKey, isShownLabel } = current;
  const { className } = props;
  const api = useMemo(() => new FecApiWrapper(), []);
  const loginState = useContext(LoginStateContext);
  const history = useHistory();

  const insertState = useCallback(
    (arg: Current) => setStates([Object.assign({}, current, arg)]),
    [current]
  );

  // for type cast
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setInfos = useCallback<(arg: Record<string, string>) => void>(
    ((arg: Infos) => {
      insertState({ infos: arg } as Current);
      console.log("set");
    }) as any,
    [insertState]
  );

  useApi(
    async (isMounted, didMounted) => {
      if (!didMounted()) return;
      insertState({ isShownLabel: false } as Current);
      const res = await api.login(current.infos);
      console.log(res);
      if (!isMounted()) return;
      if (res != null && isBadResponse(res)) {
        loginState.setIsLogin(true);
        history.push("/home");
      } else {
        const next = {
          isShownLabel: true,
          warningKey: getKeyFromRes(res),
        } as Current;
        insertState(next);
      }
    },
    api,
    [current.infos]
  );

  return (
    <LoginForm
      {...{ setValues: setInfos, isShownLabel, warningKey, className }}
    />
  );
};

const LoginContainer = React.memo(Component);
LoginContainer.displayName = "LoginContainer";

export { LoginContainer };
