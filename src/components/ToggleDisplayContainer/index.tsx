// eslint-disable-next-line no-unused-vars
import React, { ReactNode } from "react";

import { useStyles } from "./style";

interface ToggleDisplayContainerProps extends BaseComponentProps {
  isShowFirstChild: boolean;
  children: [ReactNode, ReactNode];
}

export const ToggleDisplayContainer: React.FC<ToggleDisplayContainerProps> = (
  props
) => {
  const classes = useStyles();
  const classNames = toggleDisplay(props.isShowFirstChild, classes);
  const nodeChildren = React.Children.map(props.children, (e, i) =>
    React.cloneElement(e as React.ReactElement<BaseComponentProps>, {
      className: classNames[i],
    })
  );

  return <div className={props.className}>{nodeChildren}</div>;
};

const toggleDisplay = (
  isShowFirstChild: boolean,
  classes: Record<"undisplayContainer" | "displayContainer", string>
) => {
  if (isShowFirstChild)
    return [classes.displayContainer, classes.undisplayContainer];
  return [classes.undisplayContainer, classes.displayContainer];
};
