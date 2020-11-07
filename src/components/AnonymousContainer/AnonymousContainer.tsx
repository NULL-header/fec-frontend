import React from "react";

import {
  SideBar,
  LoginContainer,
  SignupContainer,
  LinkButton,
  SwitchContainer,
  ActivateContainer,
} from "src/components";
import { useClassName } from "src/util/customhook";
import { Home, Search, Login, SignUp } from "src/components/icons";
import { useStyles } from "./style";

const components = {
  "/home": () => <div>Home</div>,
  "/search": () => <div>Search</div>,
  "/login": LoginContainer,
  "/signup": SignupContainer,
  "/account/activate/": ActivateContainer,
} as Record<string, React.FC<any>>;

type Classes = Record<"root" | "sidebar" | "main" | "info", string>;

interface Props {
  classes?: Classes;
}

const Component: React.FC<Props> = (props) => {
  const classes = useStyles();
  const classRoot = useClassName(classes.root, props.classes?.root);
  const classSidebar = useClassName(classes.sidebar, props.classes?.sidebar);
  const classMain = useClassName(classes.main, props.classes?.sidebar);
  const classInfo = useClassName(classes.info, props.classes?.info);
  return (
    <div className={classRoot}>
      <SideBar className={classSidebar}>
        <LinkButton to="/home">
          <Home />
        </LinkButton>
        <LinkButton to="/search">
          <Search />
        </LinkButton>
        <LinkButton to="/login">
          <Login />
        </LinkButton>
        <LinkButton to="/signup">
          <SignUp />
        </LinkButton>
      </SideBar>
      <div className={classMain}>
        <SwitchContainer components={components} />
      </div>
      <div className={classInfo}>info</div>
    </div>
  );
};

const AnonymousContainer = React.memo(Component);
AnonymousContainer.displayName = "AnonymousContainer";

export { AnonymousContainer };
