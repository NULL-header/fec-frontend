import React from "react";
import withStyles from "react-jss";
import { styles } from "./style";

interface Props extends BaseComponentProps {
  classes: Record<keyof typeof styles, string>;
  setValues: (e: string) => void;
  children: React.ReactElement[];
}

const Component: React.FC<Props> = (props) => {
  // const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  //  e.preventDefault();
  //  const button = e.currentTarget;
  //  props.setValues(button.value);
  // };
  const buttons = React.Children.map(props.children, (e, i) =>
    React.cloneElement(e, {
      // onClick,
      className: props.classes.button,
    })
  );

  return (
    <div className={props.classes.root + " " + props.className}>{buttons}</div>
  );
};

const SideBar = React.memo(withStyles(styles as any)(Component));
SideBar.displayName = "SideBar";

export { SideBar };
