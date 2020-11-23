import React from "react";

import { useThemeName, themes } from "src/theme";
import { getObjKeys } from "src/util";

const themeNames = getObjKeys(themes);

const useButtons = () => {
  const [themeName, setThemeName] = useThemeName();
  return themeNames
    .filter((e) => e != themeName)
    .map((e) => (
      <button onClick={() => setThemeName(e)} key={e}>
        {e + " mode"}
      </button>
    ));
};

const Component: React.FC<BaseComponentProps> = (props) => {
  const buttons = useButtons();
  return <div>{buttons}</div>;
};

const Theme = React.memo(Component);
Theme.displayName = "Theme";

export { Theme };
