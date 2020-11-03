import React, { useState, useMemo, useContext, useCallback } from "react";
import { useHistory } from "react-router-dom";

import {
  FecApiWrapper,
  isGoodResponse,
  isOldTokenResponse,
} from "src/FecApiWrapper";
import { useCurrent } from "src/util/customhook";
import { useApi } from "src/customhook";
import { LoginStateContext } from "src/components/ContentContainer/context";

interface Current {
  isFired: boolean;
}

const defaultState = [
  {
    isFired: false,
  },
] as Current[];

const Component: React.FC<BaseComponentProps> = (props) => {
  const [states, setStates] = useState(defaultState);
  const current = useCurrent(states);
  const api = useMemo(() => new FecApiWrapper(), []);
  const history = useHistory();
  const loginState = useContext(LoginStateContext);

  const insertState = useCallback(
    (arg: Current) => setStates([Object.assign({}, current, arg)]),
    [current]
  );

  const setIsFired = useCallback(
    (arg: boolean) => insertState({ isFired: arg } as Current),
    [insertState]
  );

  const onClick = useCallback(() => setIsFired(true), [setIsFired]);

  useApi(
    async (isMounted, didMounted) => {
      if (!didMounted() || !current.isFired) return;
      const res = await api.logout();
      console.log(res);
      if (!isMounted()) return;
      if (isGoodResponse(res) || isOldTokenResponse(res)) {
        history.push("/home");
        loginState.setIsLogin(false);
        return;
      }
      const next = { isFired: false } as Current;
      insertState(next);
    },
    api,
    [current.isFired]
  );

  return (
    <div>
      <button onClick={onClick}>logout</button>
    </div>
  );
};

const Logout = React.memo(Component);
Logout.displayName = "Logout";

export { Logout };
