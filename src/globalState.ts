import { Reducer, Ref, useCallback, useEffect } from "react";
import { createContainer } from "react-tracked";
import { KVSIndexedDB, kvsIndexedDB } from "@kvs/indexeddb";
import { AsyncActionHandlers, useReducerAsync } from "use-reducer-async";
import { themes } from "./theme";
import { useAsyncTask, useAsyncRun } from "react-hooks-async";

type ThemeNames = keyof typeof themes;
export type State = {
  isLoadingThemeName: boolean;
  isSettingThemeName: boolean;
  isLoadingDB: boolean;
  kvs: KVSIndexedDB<any>;
  themeName: ThemeNames;
};
export type KVSState = Partial<{
  isLoading: boolean;
  isSetting: boolean;
  themeName: ThemeNames;
}>;
type Action =
  | {
      type: "KVS";
      states: KVSState;
    }
  | { type: "UPDATE"; nextState: Partial<State> };
type AsyncAction = { type: "LOAD_DB" };
type GlobalReducer = Reducer<State, Action>;
type GlobalAsyncReducer = AsyncActionHandlers<GlobalReducer, AsyncAction>;

const setNonNullable = (target: any) => (key: keyof State, value: any) => {
  if (value == null) return;
  target[key] = value;
};

const reducer: GlobalReducer = (state, action) => {
  switch (action.type) {
    case "KVS": {
      const next = {} as State;
      const setter = setNonNullable(next);
      const { isLoading, isSetting, themeName } = action.states;
      setter("isLoadingThemeName", isLoading);
      setter("isSettingThemeName", isSetting);
      setter("themeName", themeName);
      return { ...state, ...next };
    }
    case "UPDATE": {
      return { ...state, ...action.nextState };
    }
  }
};

const asyncReducer: GlobalAsyncReducer = {
  LOAD_DB: ({ dispatch, signal }) => async (action) => {
    if (signal.aborted) return;
    dispatch({ type: "UPDATE", nextState: { isLoadingDB: true } });
    const kvs = await kvsIndexedDB({ name: "4ecode", version: 1 });
    if (signal.aborted) return;
    dispatch({ type: "UPDATE", nextState: { kvs, isLoadingDB: false } });
  },
};

const useValue = () => {
  const [state, dispatch] = useReducerAsync(reducer, {} as any, asyncReducer);
  useEffect(() => {
    dispatch({ type: "LOAD_DB" });
  }, [dispatch]);
  return [state, dispatch] as const;
};

export const { Provider, useSelector, useUpdate } = createContainer(useValue);
