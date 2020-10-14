import React, { useState, useCallback } from "react";
import withStyle from "react-jss";

import { SideBar, DisplayContainer } from "src/components";
import { useVariable } from "src/util/customhook";
import { styles } from "./style";

interface Props extends BaseComponentProps {
  classes: Record<keyof typeof styles, string>;
}

const Component: React.FC<Props> = (props) => {
  const [[currentName], setStates] = useState(["Home"]);
  const classes = useVariable(props.classes);

  const insertState = useCallback((e: string) => setStates([e]), []);

  return (
    <div className={classes.root}>
      <SideBar className={classes.sidebar}>
        <button value="Home">Home</button>
        <button value="Search">Search</button>
        <button value="Notify">Notify</button>
        <button value="MyPage">MyPage</button>
        <button value="Option">Option</button>
      </SideBar>
      <div style={{ width: "50%" }}>OnymousContainer</div>
      <DisplayContainer currentKey={currentName}>
        <div key="Home">Home</div>
        <div key="Search">Search</div>
        <div key="Notify">Notify</div>
        <div key="MyPage">MyPage</div>
        <div key="Option">Option</div>
      </DisplayContainer>
    </div>
  );
};

const OnymousContainer = React.memo(withStyle(styles as any)(Component));
OnymousContainer.displayName = "OnymousContainer";

export { OnymousContainer };
