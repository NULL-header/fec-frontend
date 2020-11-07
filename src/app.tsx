import React, { useMemo } from "react";
import { BrowserRouter } from "react-router-dom";

import { AppContainer } from "./components";
import { CONSTVALUES } from "./config";
import { theming } from "./theme";

const { ThemeProvider, useTheme } = theming;

export const App = () => {
  const baseName = useMemo(() => CONSTVALUES.routeUrl, []);
  const theme = useTheme();
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter basename={baseName}>
        <AppContainer />
      </BrowserRouter>
    </ThemeProvider>
  );
};
