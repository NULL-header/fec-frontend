import React, { useMemo } from "react";
import { BrowserRouter } from "react-router-dom";

import { ThemeProvider } from "./theme";
import { DbProvider } from "./db";
import { AppContainer } from "./components";
import { CONSTVALUES } from "./config";

export const App = () => {
  const baseName = useMemo(() => CONSTVALUES.routeUrl, []);
  return (
    <DbProvider>
      <ThemeProvider>
        <BrowserRouter basename={baseName}>
          <AppContainer />
        </BrowserRouter>
      </ThemeProvider>
    </DbProvider>
  );
};
