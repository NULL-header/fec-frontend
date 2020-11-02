import React, { useMemo } from "react";
import { BrowserRouter } from "react-router-dom";

import { ContentContainer } from "src/components";
import { CONSTVALUES } from "src/config";

interface AppContainerProps extends BaseComponentProps {
  className?: string;
}

interface AppData {
  showFirst: boolean;
}

type History = AppData[];

export const AppContainer: React.FC<AppContainerProps> = (props) => {
  const [history, _setHistory] = React.useState([
    { showFirst: true },
  ] as History);
  const _current = history[history.length - 1];
  const baseName = useMemo(() => CONSTVALUES.routeUrl, []);
  // TODO setter of showfirst and themeprops

  return (
    <BrowserRouter basename={baseName}>
      <ContentContainer />
    </BrowserRouter>
  );
};
