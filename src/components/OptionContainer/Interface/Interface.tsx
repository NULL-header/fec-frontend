import React from "react";

import { Theme } from "./theme";

const Component: React.FC<BaseComponentProps> = (props) => {
  return (
    <div>
      <Theme />
    </div>
  );
};

const Interface = React.memo(Component);
Interface.displayName = "Interface";

export { Interface };
