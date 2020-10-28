import React from "react";
import withStyles from "react-jss";
import { useRouteMatch } from "react-router-dom";

import { SwitchContainer } from "src/components";

import { Account } from "./Account";
import { Topics } from "./Topics";
import { styles } from "./style";

interface Props extends BaseComponentProps {
  classes: Record<keyof typeof styles, string>;
}

const components = {
  "/account": Account,
  "/": Topics,
} as Record<string, React.FC<any>>;

const Component: React.FC<Props> = (props) => {
  const match = useRouteMatch();
  return <SwitchContainer base={match.url} components={components} />;
};

const OptionContainer = React.memo(withStyles(styles as any)(Component));
OptionContainer.displayName = "OptionContainer";

export { OptionContainer };
