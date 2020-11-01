import React from "react";
import withStyle from "react-jss";

import {
  SideBar,
  SwitchContainer,
  LinkButton,
  OptionContainer,
  MyPageContainer,
} from "src/components";
import { useVariable } from "src/util/customhook";
import { styles } from "./style";

interface Props extends BaseComponentProps {
  classes: Record<keyof typeof styles, string>;
}

const components = {
  "/home": () => <div>Home</div>,
  "/search": () => <div>Search</div>,
  "/notify": () => <div>Notify</div>,
  "/mypage": MyPageContainer,
  "/option": OptionContainer,
} as Record<string, React.FC<any>>;

const Component: React.FC<Props> = (props) => {
  const classes = useVariable(props.classes);

  return (
    <div className={classes.root}>
      <SideBar className={classes.sidebar}>
        <LinkButton to="/home">Home</LinkButton>
        <LinkButton to="/search">Search</LinkButton>
        <LinkButton to="/notify">Notify</LinkButton>
        <LinkButton to="/mypage">MyPage</LinkButton>
        <LinkButton to="/option">Option</LinkButton>
      </SideBar>
      <SwitchContainer components={components} />
    </div>
  );
};

const OnymousContainer = React.memo(withStyle(styles as any)(Component));
OnymousContainer.displayName = "OnymousContainer";

export { OnymousContainer };
