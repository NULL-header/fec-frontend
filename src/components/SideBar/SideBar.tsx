import React from "react";
import withStyles from "react-jss";
import { styles } from "./style";

interface Props extends BaseComponentProps {
  classes: Record<keyof typeof styles, string>;
  children: React.ReactElement[];
}

const Component: React.FC<Props> = (props) => {
  return (
    <div className={props.classes.root + " " + props.className}>
      {props.children}
    </div>
  );
};

const SideBar = React.memo(withStyles(styles as any)(Component));
SideBar.displayName = "SideBar";

export { SideBar };
