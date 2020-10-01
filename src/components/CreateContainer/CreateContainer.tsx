import React, { memo, useState, useCallback, useMemo } from "react";
import update from "immutability-helper";

import { FecApiWrapper, isBadResponse } from "src/FecApiWrapper";
import { useCurrent, useApi, useVariable } from "src/customhook";

// eslint-disable-next-line no-unused-vars
import { CreateForm, Infos, warning } from "./CreateForm";

interface CreateContainerProps extends BaseComponentProps {
  className?: string;
}

interface Current {
  infos: Infos;
  isShownLabel: boolean;
  warningKey: warning;
}

type State = Current[];

const defaultCurrent: Current = {
  infos: {
    email: "",
    password: "",
    name: "",
  },
  isShownLabel: false,
  warningKey: "noCommunicate",
};

const defaultState: State = [defaultCurrent];

type UnPromisify<T> = T extends Promise<infer U> ? U : T;

type AsyncReturnType<T extends (...args: any) => Promise<any>> = UnPromisify<
  ReturnType<T>
>;

type Responses = AsyncReturnType<typeof FecApiWrapper.prototype.createUser>;

const getKeyFromRes = (res: Responses): warning => {
  let key: warning = "unknown";
  if (res == null) key = "noCommunicate";
  else if (isBadResponse(res)) {
    const errorKey = res.errors[0];
    console.log("bad");
    if (errorKey.key === "email") {
      key = "duplicateEmail";
    } else if (errorKey.key === "name") {
      key = "duplicateName";
    }
  }
  return key;
};

const NotYetCreateContainer: React.FC<CreateContainerProps> = (props) => {
  const [state, setState] = useState(defaultState);
  const current = useCurrent(state);
  const isShownLabel = useVariable(current.isShownLabel);
  const warningKey = useVariable(current.warningKey);
  const api = useMemo(() => new FecApiWrapper(), []);

  const insertState = useCallback(
    (arg: Current) => {
      const newCurrent = Object.assign({}, current, arg);
      const nextState = update(state, { $push: [newCurrent] });
      setState(nextState);
    },
    [current, state]
  );

  const setInfos = useCallback(
    (arg: Infos) => {
      insertState({ infos: arg } as Current);
    },
    [insertState]
  );

  useApi(
    async (isMounted, didMounted) => {
      if (!didMounted()) return;
      insertState({ isShownLabel: false } as Current);
      console.log(current.infos);
      const res = await api.createUser(current.infos);
      console.log(res);
      const next = {
        isShownLabel: true,
        warningKey: getKeyFromRes(res),
      } as Current;
      if (isMounted()) insertState(next);
    },
    api,
    [current.infos]
  );

  return <CreateForm {...{ setInfos, isShownLabel, warningKey }} />;
};

const CreateContainer = memo(NotYetCreateContainer);
CreateContainer.displayName = "CreateContainer";

export { CreateContainer };
