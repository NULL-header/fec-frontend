import React from "react";
import { useStyles } from "./style";

interface DisplayContainerProps extends BaseComponent {
  componentMap: ComponentMap;
  currentName: string;
}

export const DisplayContainer: React.FC<DisplayContainerProps> = (props) => {
  const classes = useStyles();

  const nodeChildren = Array.from(props.componentMap.entries()).map((e, i) => {
    const Element = e[1];
    const isCurrent = e[0] === props.currentName;
    const className = isCurrent
      ? classes.displayContainer
      : classes.undisplayContainer;
    return <Element className={className} key={i} />;
  });
  const rootClassName =
    classes.root + (props.className == null ? "" : " " + props.className);

  return <div className={rootClassName}>{nodeChildren}</div>;
};
