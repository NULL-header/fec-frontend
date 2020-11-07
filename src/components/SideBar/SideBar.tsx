import React from "react";
import { useStyles } from "./style";

interface Props extends BaseComponentProps {
  children: React.ReactElement[];
}

const Component: React.FC<Props> = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root + " " + props.className}>{props.children}</div>
  );
};

const SideBar = React.memo(Component);
SideBar.displayName = "SideBar";

export { SideBar };
