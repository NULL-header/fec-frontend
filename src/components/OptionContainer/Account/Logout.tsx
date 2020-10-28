import React, { useState, useMemo, useContext } from "react";
import { useHistory } from "react-router-dom";

import { FecApiWrapper, isBadResponse } from "src/FecApiWrapper";
import { useCurrent } from "src/util/customhook";
import { useApi } from "src/customhook";
import { LoginStateContext } from "src/components/ContentContainer/context";

interface Current {
  isFired: boolean;
  wasLogout: boolean;
}

const defaultState = [
  {
    isFired: false,
    wasLogout: false,
  },
] as Current[];

const Component: React.FC<BaseComponentProps> = (props) => {
  const [states, setStates] = useState(defaultState);
  const current = useCurrent(states);
  const api = useMemo(() => new FecApiWrapper(), []);
  const history = useHistory();
  const loginState = useContext(LoginStateContext);

  const insertState = (arg: Current) =>
    setStates([Object.assign({}, current, arg)]);

  const setIsFired = (arg: boolean) => insertState({ isFired: arg } as Current);

  const onClick = () => setIsFired(true);

  useApi(
    async (isMounted, didMounted) => {
      if (!didMounted() || !current.isFired) return;
      const res = await api.logout();
      console.log(res);
      const next = { isFired: false } as Current;
      if (res != null) {
        next.wasLogout = true;
        history.push("/home");
        loginState.setIsLogin(false);
      }
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
