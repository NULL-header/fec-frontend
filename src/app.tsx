import React, { useCallback } from "react";
import { BrowserRouter } from "react-router-dom";

import { AppContainer } from "./components";
import { CONSTVALUES } from "./config";
import { Provider, useUpdate, KVSState, useSelector } from "./globalState";
import { useTheme } from "./theme";

const ThemeLoader: HavingChildComponent = React.memo((props) => {
  const isLoading = useSelector((state) => state.isLoadingThemeName);
  const kvs = useSelector((state) => state.kvs);
  const themeName = useSelector((state) => state.themeName);
  const dispatch = useUpdate();
  const setStateKVS = useCallback(
    (args: KVSState) => dispatch({ type: "KVS", states: args }),
    [dispatch]
  );
  const ThemeProvider = useTheme(
    CONSTVALUES.themeNameCacheKey,
    kvs,
    CONSTVALUES.defaultThemeName,
    setStateKVS
  );
  if (isLoading == null) return <div>Start loading theme name</div>;
  else if (isLoading) return <div>Loading theme name</div>;
  else
    return (
      <ThemeProvider themeName={themeName}>{props.children}</ThemeProvider>
    );
});

const DBLoader: HavingChildComponent = React.memo((props) => {
  const isLoading = useSelector((state) => state.isLoadingDB);
  if (isLoading == null) return <div>Start loading</div>;
  else if (isLoading) return <div>Loading DB</div>;
  else return <ThemeLoader>{props.children}</ThemeLoader>;
});

export const App = () => {
  return (
    <Provider>
      <BrowserRouter basename={CONSTVALUES.routeUrl}>
        <DBLoader>
          <AppContainer />
        </DBLoader>
      </BrowserRouter>
    </Provider>
  );
};
