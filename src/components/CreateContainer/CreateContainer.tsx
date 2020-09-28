import React, { useState, useCallback, useMemo } from "react";

import { FecApiWrapper, isBadResponse } from "src/FecApiWrapper";
import { useApi } from "src/customhook";
import { useCurrent, useVariable } from "src/util/customhook";
// eslint-disable-next-line no-unused-vars
import { BaseComponentProps } from "src/util/types";

// eslint-disable-next-line no-unused-vars
import { CreateForm, Infos } from "./CreateForm";
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
      name: "",
    },
    isShownLabel: false,
    warningKey: "noCommunicate",
  } as Current,
];

type UnPromisify<T> = T extends Promise<infer U> ? U : T;

type AsyncReturnType<T extends (...args: any) => Promise<any>> = UnPromisify<
  ReturnType<T>
>;

type Responses = AsyncReturnType<typeof FecApiWrapper.prototype.createUser>;

const getKeyFromRes = (res: Responses): warning => {
  let key: warning = "unknown";
  if (res == null) key = "noCommunicate";
  else if (isBadResponse(res)) {
    const errorKeys = res.errors.map((e) => e.key);
    if (errorKeys.includes("email")) key = "duplicateEmail";
    else if (errorKeys.includes("name")) key = "duplicateName";
  }
  return key;
};

const Component: React.FC<BaseComponentProps> = (props) => {
  const [states, setStates] = useState(defaultStates);
  const current = useCurrent(states);
  const isShownLabel = useVariable(current.isShownLabel);
  const warningKey = useVariable(current.warningKey);
  const className = useVariable(props.className);
  const api = useMemo(() => new FecApiWrapper(), []);

  const insertState = useCallback(
    (arg: Current) => setStates([Object.assign({}, current, arg)]),
    [current]
  );

  // for type cast
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setInfos = useCallback<(arg: Record<string, string>) => void>(
    ((arg: Infos) => {
      insertState({ infos: arg } as Current);
    }) as any,
    [insertState]
  );

  useApi(
    async (isMounted, didMounted) => {
      if (!didMounted()) return;
      insertState({ isShownLabel: false } as Current);
      console.log("api_base");
      console.log(process.env.REACT_APP_API_BASE);
      console.log("production");
      console.log(process.env.PRODUCTION);

      console.log(current.infos);
      const res = await api.createUser(current.infos);
      console.log({ res });
      const next = {
        isShownLabel: true,
        warningKey: getKeyFromRes(res),
      } as Current;
      if (isMounted()) insertState(next);
    },
    api,
    [current.infos]
  );

  return (
    <CreateForm
      {...{ setValues: setInfos, isShownLabel, warningKey, className }}
    />
  );
};

const CreateContainer = React.memo(Component);
CreateContainer.displayName = "CreateContainer";

export { CreateContainer };
