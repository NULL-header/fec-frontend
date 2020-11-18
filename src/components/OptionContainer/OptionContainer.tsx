import React from "react";
import { useRouteMatch } from "react-router-dom";

import { SwitchContainer } from "src/components";

import { Account } from "./Account";
import { Interface } from "./Interface";
import { Topics } from "./Topics";
import { usestyles } from "./style";

const components = {
  "/account": Account,
  "/theme": Interface,
  "/": Topics,
} as Record<string, React.FC<any>>;

const Component: React.FC<BaseComponentProps> = (props) => {
  const match = useRouteMatch();
  return <SwitchContainer base={match.url} components={components} />;
};

const OptionContainer = React.memo(Component);
OptionContainer.displayName = "OptionContainer";

export { OptionContainer };
