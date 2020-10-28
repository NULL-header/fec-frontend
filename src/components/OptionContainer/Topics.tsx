import React from "react";
import { useRouteMatch } from "react-router-dom";

import { LinkButton, LinkTabs } from "src/components";

const Component: React.FC<BaseComponentProps> = (props) => {
  const match = useRouteMatch();
  return (
    <LinkTabs base={match.url}>
      <LinkButton to="/account">Account</LinkButton>
      <LinkButton to="/theme">Theme</LinkButton>
    </LinkTabs>
  );
};

const Topics = React.memo(Component);
Topics.displayName = "Topics";

export { Topics };
