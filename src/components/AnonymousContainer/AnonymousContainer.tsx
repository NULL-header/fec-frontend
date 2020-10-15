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

const Component: React.FC<Props> = (props) => {
  return (
    <div className={props.classes.root}>
      <SideBar className={props.classes.sidebar}>
        <LinkButton to="/home">Home</LinkButton>
        <LinkButton to="/search">Search</LinkButton>
        <LinkButton to="login">Log in</LinkButton>
        <LinkButton to="create">Account Create</LinkButton>
      </SideBar>
      <SwitchContainer>
        <div key="/home">Home</div>
        <div key="/search">Search</div>
        <LoginContainer key="/login" />
        <SignupContainer key="/create" />
      </SwitchContainer>
    </div>
  );
};

const AnonymousContainer = React.memo(withStyle(styles as any)(Component));
AnonymousContainer.displayName = "AnonymousContainer";

export { AnonymousContainer };
