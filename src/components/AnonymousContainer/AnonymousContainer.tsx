import React from "react";
import withStyle from "react-jss";

import {
  SideBar,
  LoginContainer,
  SignupContainer,
  LinkButton,
  SwitchContainer,
} from "src/components";
import { styles } from "./style";

interface Props extends BaseComponentProps {
  classes: Record<keyof typeof styles, string>;
}

const components = {
  "/home": () => <div>Home</div>,
  "/search": () => <div>Search</div>,
  "/login": LoginContainer,
  "/signup": SignupContainer,
} as Record<string, React.FC>;

const Component: React.FC<Props> = (props) => {
  return (
    <div className={props.classes.root}>
      <SideBar className={props.classes.sidebar}>
        <LinkButton to="/home">Home</LinkButton>
        <LinkButton to="/search">Search</LinkButton>
        <LinkButton to="login">Log in</LinkButton>
        <LinkButton to="signup">Sign up</LinkButton>
      </SideBar>
      <SwitchContainer components={components} />
    </div>
  );
};

const AnonymousContainer = React.memo(withStyle(styles as any)(Component));
AnonymousContainer.displayName = "AnonymousContainer";

export { AnonymousContainer };
