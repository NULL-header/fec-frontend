import React from "react";

const Component: React.FC<BaseComponentProps> = (props) => {
  return <div>AnonymousContainer</div>;
};

const AnonymousContainer = React.memo(Component);
AnonymousContainer.displayName = "AnonymousContainer";

export { AnonymousContainer };
