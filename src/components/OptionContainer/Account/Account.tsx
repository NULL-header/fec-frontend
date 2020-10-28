import React from "react";

import { Logout } from "./Logout";

const Component: React.FC<BaseComponentProps> = (props) => {
  return (
    <div>
      <Logout />
    </div>
  );
};

const Account = React.memo(Component);
Account.displayName = "Account";

export { Account };
