import React, { useMemo } from "react";
// eslint-disable-next-line no-unused-vars
import { Switch, Route, RouteComponentProps } from "react-router-dom";

interface Props extends BaseComponentProps {
  components: Record<string, BaseComponent & React.FC<RouteComponentProps>>;
}

const Component: React.FC<Props> = (props) => {
  const components = useMemo(
    () =>
      Object.keys(props.components).map((e) => (
        <Route key={e} path={e} component={props.components[e]} />
      )),
    [props.components]
  );
  return (
    <Switch>
      {components}
      {props.children}
    </Switch>
  );
};

const SwitchContainer = React.memo(Component);
SwitchContainer.displayName = "SwitchContainer";

export { SwitchContainer };
