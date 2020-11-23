import React, { useMemo } from "react";
import { BrowserRouter } from "react-router-dom";

import { ThemeProvider } from "./theme";
import { AppContainer } from "./components";
import { CONSTVALUES } from "./config";

export const App = () => {
  const baseName = useMemo(() => CONSTVALUES.routeUrl, []);
  return (
    <ThemeProvider>
      <BrowserRouter basename={baseName}>
        <AppContainer />
      </BrowserRouter>
    </ThemeProvider>
  );
};
