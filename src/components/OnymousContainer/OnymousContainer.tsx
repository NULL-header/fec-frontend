import React from "react";

import {
  SideBar,
  SwitchContainer,
  LinkButton,
  OptionContainer,
} from "src/components";
import { useClassName } from "src/util/customhook";
import { Home, Search, Notify, MyPage, Setting } from "src/components/icons";
import { useStyles } from "./style";

const components = {
  "/home": () => <div>Home</div>,
  "/search": () => <div>Search</div>,
  "/notify": () => <div>Notify</div>,
  "/mypage": () => <div>MyPage</div>,
  "/option": OptionContainer,
} as Record<string, React.FC<any>>;

type Classes = Record<"root" | "sidebar" | "main" | "info", string>;

interface Props {
  classes?: Classes;
}

const Component: React.FC<Props> = (props) => {
  const classes = useStyles();
  const classRoot = useClassName(classes.root, props.classes?.root);
  const classSidebar = useClassName(classes.sidebar, props.classes?.sidebar);
  const classMain = useClassName(classes.main, props.classes?.main);
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
        <LinkButton to="/notify">
          <Notify />
        </LinkButton>
        <LinkButton to="/mypage">
          <MyPage />
        </LinkButton>
        <LinkButton to="/option">
          <Setting />
        </LinkButton>
      </SideBar>
      <div className={classMain}>
        <SwitchContainer components={components} />
      </div>
      <div className={classInfo}>info</div>
    </div>
  );
};

const OnymousContainer = React.memo(Component);
OnymousContainer.displayName = "OnymousContainer";

export { OnymousContainer };
