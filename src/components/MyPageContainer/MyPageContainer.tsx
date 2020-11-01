import React, { useState, useCallback, useMemo } from "react";

import { ToggleDisplayContainer } from "src/components";
import { useApi } from "src/customhook";
import { useCurrent } from "src/util/customhook";
// eslint-disable-next-line no-unused-vars
import { AsyncReturnType } from "src/util/types";
import { FecApiWrapper, isBadResponse } from "src/FecApiWrapper";
// eslint-disable-next-line no-unused-vars
import { AuthGetResponse } from "src/FecApiWrapper/APITypes";

// eslint-disable-next-line no-unused-vars
import { Warning } from "./types";

type Responses = AsyncReturnType<typeof FecApiWrapper.prototype.getMyPage>;

type Items = AuthGetResponse["body"];

interface Current {
  didGetMyPageValue: boolean;
  items: Items;
  warning: Warning;
}

const defaultState = [
  { didGetMyPageValue: false, items: {} as Items } as Current,
];

const getWarning = (res: Responses) => {
  let warning: Warning = "unknown";
  if (res == null) warning = "noCommunicate";
  else if (isBadResponse(res)) warning = "missAuth";
  return warning;
};

const Component: React.FC<BaseComponentProps> = (props) => {
  const [states, setStates] = useState(defaultState);
  const current = useCurrent(states);
  const api = useMemo(() => new FecApiWrapper(), []);

  const insertState = useCallback(
    (arg: Current) => setStates([Object.assign({}, current, arg)]),
    [current]
  );

  useApi(
    async (isMounted, didMounted) => {
      const res = await api.getMyPage();
      if (res != null && !isBadResponse(res) && isMounted())
        insertState({ didGetMyPageValue: true, items: res.body } as Current);
      else insertState({ warning: getWarning(res) } as Current);
    },
    api,
    []
  );

  // TODO: use toggle display container
  return (
    <ToggleDisplayContainer isShownFirstChild={current.didGetMyPageValue}>
      <div>{JSON.stringify(current.items)}</div>
      <div>Loading</div>
    </ToggleDisplayContainer>
  );
};

const MyPageContainer = React.memo(Component);
MyPageContainer.displayName = "MyPageContainer";

export { MyPageContainer };
