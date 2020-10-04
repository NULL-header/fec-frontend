import React from "react";

import { SideBar } from "src/components";

const Component: React.FC<BaseComponentProps> = (props) => {
  return (
    <div>
      <SideBar />
      <div>AnonymousContainer</div>
    </div>
  );
};

const AnonymousContainer = React.memo(Component);
AnonymousContainer.displayName = "AnonymousContainer";

export { AnonymousContainer };
