import React from "react";

const Component: React.FC<BaseComponentProps> = (props) => {
  return (
    <div>
      <button>logout</button>
    </div>
  );
};

const Logout = React.memo(Component);
Logout.displayName = "Logout";

export { Logout };
