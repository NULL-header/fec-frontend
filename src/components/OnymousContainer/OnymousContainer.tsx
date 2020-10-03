import React from "react";

const Component: React.FC<BaseComponentProps> = (props) => {
  return <div>OnymousContainer</div>;
};

const OnymousContainer = React.memo(Component);
OnymousContainer.displayName = "OnymousContainer";

export { OnymousContainer };
