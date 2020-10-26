import React, { useMemo, useState, useCallback } from "react";

import { FecApiWrapper, isBadResponse } from "src/FecApiWrapper";
import { useApi } from "src/customhook";
import { useCurrent } from "src/util/customhook";
import { AgreeForm } from "./AgreeForm";
import { BadAccessGuard } from "./BadAccessGuard";
// eslint-disable-next-line no-unused-vars
import { Warning, Queries } from "./types";

interface Current {
  isFired: boolean;
  wasActivated: boolean;
  warning: Warning;
  isShownLabel: boolean;
  queryRecord: Queries;
}

type UnPromisify<T> = T extends Promise<infer U> ? U : T;

type AsyncReturnType<T extends (...args: any) => Promise<any>> = UnPromisify<
  ReturnType<T>
>;

type Responses = AsyncReturnType<typeof FecApiWrapper.prototype.activateUser>;

const defaultStates = [
  {
    wasActivated: false,
    warning: "noCommunicate",
    isShownLabel: false,
    queryRecord: {} as Queries,
  },
] as Current[];

const getWarning = (res: Responses): Warning => {
  let warning: Warning = "unknown";
  if (res == null) warning = "noCommunicate";
  else if (isBadResponse(res)) {
    warning = "missAuth";
  }
  return warning;
};

const Component: React.FC<BaseComponentProps> = (props) => {
  const [states, setStates] = useState(defaultStates);
  const current = useCurrent(states);
  const { wasActivated, warning, isShownLabel } = current;
  const api = useMemo(() => new FecApiWrapper(), []);

  const insertState = useCallback(
    (arg: Current) => setStates([Object.assign({}, current, arg)]),
    [current]
  );

  const onClick = useCallback(
    (_, queryRecord: Queries) => insertState({ queryRecord } as Current),
    [insertState]
  );

  useApi(
    async (isMounted, didMounted) => {
      if (!didMounted()) return;
      insertState({ isShownLabel: false } as Current);
      const res = await api.activateUser(current.queryRecord);
      console.log({ res });
      const warning = getWarning(res);
      const next = { warning } as Current;
      if (res != null && !isBadResponse(res)) next.wasActivated = true;
      else next.isShownLabel = true;
      if (isMounted()) insertState(next);
    },
    api,
    [current.queryRecord, api]
  );

  return (
    <BadAccessGuard>
      <AgreeForm {...{ isShownLabel, warning, wasActivated, onClick }} />
    </BadAccessGuard>
  );
};

const ActivateContainer = React.memo(Component);
ActivateContainer.displayName = "ActivateContainer";

export { ActivateContainer };
