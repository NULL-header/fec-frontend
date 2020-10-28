import React, { useMemo, useState, useCallback } from "react";

import {
  AnonymousContainer,
  OnymousContainer,
  ToggleDisplayContainer,
} from "src/components";
import { isLogin } from "src/FecApiWrapper";
import { useCurrent } from "src/util/customhook";

import { LoginStateContext } from "./context";

interface Current {
  isLogin: boolean;
}

const Component: React.FC<BaseComponentProps> = (props) => {
  const [states, setStates] = useState([{ isLogin: isLogin() } as Current]);
  const current = useCurrent(states);

  const insertState = useCallback(
    (arg: Current) => setStates([Object.assign({}, current, arg)]),
    [current]
  );

  const setIsLogin = useCallback(
    (arg: boolean) => insertState({ isLogin: arg } as Current),
    [insertState]
  );

  const loginState = useMemo(() => ({ isLogin: current.isLogin, setIsLogin }), [
    current.isLogin,
    setIsLogin,
  ]);

  return (
    <LoginStateContext.Provider value={loginState}>
      <ToggleDisplayContainer isShownFirstChild={current.isLogin}>
        <OnymousContainer />
        <AnonymousContainer />
      </ToggleDisplayContainer>
    </LoginStateContext.Provider>
  );
};

const ContentContainer = React.memo(Component);
ContentContainer.displayName = "ContentContainer";

export { ContentContainer };
