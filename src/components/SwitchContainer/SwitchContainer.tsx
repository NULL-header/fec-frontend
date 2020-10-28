import React, { useMemo } from "react";
// eslint-disable-next-line no-unused-vars
import { Switch, Route, RouteComponentProps } from "react-router-dom";

interface Props extends BaseComponentProps {
  components: Record<string, BaseComponent & React.FC<RouteComponentProps>>;
  base?: string;
}

const Component: React.FC<Props> = (props) => {
  const baseUrl = useMemo(() => (props.base == null ? "" : props.base), [
    props.base,
  ]);
  const components = useMemo(
    () =>
      Object.keys(props.components).map((e) => (
        <Route key={e} path={baseUrl + e} component={props.components[e]} />
      )),
    [props.components, baseUrl]
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
