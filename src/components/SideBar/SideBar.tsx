import React from "react";

const Component: React.FC<BaseComponentProps> = (props) => {
  return <div>sidebar</div>;
};

const SideBar = React.memo(Component);
SideBar.displayName = "SideBar";

export { SideBar };
