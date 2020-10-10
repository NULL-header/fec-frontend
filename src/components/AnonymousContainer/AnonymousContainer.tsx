import React, { useState, useCallback } from "react";
import withStyle from "react-jss";

import { SideBar, DisplayContainer } from "src/components";
import { styles } from "./style";

interface Props extends BaseComponentProps {
  classes: Record<keyof typeof styles, string>;
}

const Component: React.FC<Props> = (props) => {
  const [[currentName], setStates] = useState(["Home"]);

  const insertState = useCallback((e: string) => setStates([e]), []);
  return (
    <div className={props.classes.root}>
      <SideBar setValues={insertState} className={props.classes.sidebar}>
        <button value="Home">Home</button>
        <button value="Search">Search</button>
        <button value="MyPage">MyPage</button>
      </SideBar>
      <div style={{ width: "50%" }}>AnonymousContainer</div>
      <DisplayContainer currentKey={currentName}>
        <div key="Home">Home</div>
        <div key="Search">Search</div>
        <div key="MyPage">MyPage</div>
      </DisplayContainer>
    </div>
  );
};

const AnonymousContainer = React.memo(withStyle(styles as any)(Component));
AnonymousContainer.displayName = "AnonymousContainer";

export { AnonymousContainer };
