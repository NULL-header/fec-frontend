import React, { useMemo } from "react";
// eslint-disable-next-line no-unused-vars
import { ThemeProvider, ThemeOptions, createMuiTheme } from "@material-ui/core";
import { BrowserRouter } from "react-router-dom";

import { ContentContainer } from "src/components";
import { CONSTVALUES } from "src/config";

interface AppContainerProps extends BaseComponentProps {
  className?: string;
}

interface AppData {
  themeProps: ThemeOptions;
  showFirst: boolean;
}

type History = AppData[];

const defaultProp: ThemeOptions = {
  palette: {
    primary: {
      main: "#86b25f",
    },
  },
};

export const AppContainer: React.FC<AppContainerProps> = (props) => {
  const [history, _setHistory] = React.useState([
    { themeProps: defaultProp, showFirst: true },
  ] as History);
  const current = history[history.length - 1];
  const theme = createMuiTheme(current.themeProps);
  const baseName = useMemo(() => CONSTVALUES.routeUrl, []);
  // TODO setter of showfirst and themeprops

  return (
    <BrowserRouter basename={baseName}>
      <ThemeProvider theme={theme}>
        <ContentContainer />
      </ThemeProvider>
    </BrowserRouter>
  );
};
