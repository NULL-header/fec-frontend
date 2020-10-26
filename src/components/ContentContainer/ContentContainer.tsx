import React, { useMemo } from "react";

import {
  AnonymousContainer,
  OnymousContainer,
  ToggleDisplayContainer,
} from "src/components";
import { isLogin } from "src/FecApiWrapper";

const Component: React.FC<BaseComponentProps> = (props) => {
  const wasLogin = useMemo(() => isLogin(), []);
  return (
    <ToggleDisplayContainer isShownFirstChild={wasLogin}>
      <OnymousContainer />
      <AnonymousContainer />
    </ToggleDisplayContainer>
  );
};

const ContentContainer = React.memo(Component);
ContentContainer.displayName = "ContentContainer";

export { ContentContainer };
