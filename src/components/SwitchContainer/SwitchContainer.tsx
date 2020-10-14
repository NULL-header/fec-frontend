import React from "react";
import { Switch, Route } from "react-router-dom";

interface Props extends BaseComponentProps {
  children: React.ReactElement<KeyComponent>[];
}

const Component: React.FC<Props> = (props) => {
  return (
    <Switch>
      {props.children.map((e) => {
        const path = e.key as any;
        return (
          <Route key={path} path={path}>
            {e}
          </Route>
        );
      })}
    </Switch>
  );
};

const SwitchContainer = React.memo(Component);
SwitchContainer.displayName = "SwitchContainer";

export { SwitchContainer };
