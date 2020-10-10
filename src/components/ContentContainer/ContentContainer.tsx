import React, { useState } from "react";

import {
  AnonymousContainer,
  OnymousContainer,
  ToggleDisplayContainer,
} from "src/components";

const Component: React.FC<BaseComponentProps> = (props) => {
  const [[isLogin], _setState] = useState([true]);
  return (
    <ToggleDisplayContainer isShownFirstChild={isLogin}>
      <OnymousContainer />
      <AnonymousContainer />
    </ToggleDisplayContainer>
  );
};

const ContentContainer = React.memo(Component);
ContentContainer.displayName = "ContentContainer";

export { ContentContainer };
