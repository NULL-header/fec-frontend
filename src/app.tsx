import React, { useMemo } from "react";
import { BrowserRouter } from "react-router-dom";

import { DbProvider } from "./db";
import { AppContainer } from "./components";
import { CONSTVALUES } from "./config";

export const App = () => {
  const baseName = useMemo(() => CONSTVALUES.routeUrl, []);
  return (
    <DbProvider>
      <BrowserRouter basename={baseName}>
        <AppContainer />
      </BrowserRouter>
    </DbProvider>
  );
};
