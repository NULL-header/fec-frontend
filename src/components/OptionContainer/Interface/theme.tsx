import React from "react";

import { themes } from "src/theme";
import { useSelector, useUpdate } from "src/globalState";
import { getObjKeys } from "src/util";

const themeNames = getObjKeys(themes);

const useButtons = () => {
  const themeName = useSelector((state) => state.themeName);
  const dispatch = useUpdate();
  return themeNames
    .filter((e) => e != themeName)
    .map((e) => (
      <button
        onClick={() =>
          dispatch({ type: "UPDATE", nextState: { themeName: e } })
        }
        key={e}
      >
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
