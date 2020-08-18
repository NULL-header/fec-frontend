import React from "react";

import { useStyles } from "./style";

interface WarningLabelProps {
  className?: string;
  isShow: boolean;
  children: BaseElement;
}

export const WarningLabel: React.FC<WarningLabelProps> = (props) => {
  const classes = useStyles({ isShow: props.isShow });
  const rootClassName =
    (props.className == null ? "" : props.className) + " " + classes.root;
  const label = props.children;
  return <div className={rootClassName}>{label}</div>;
};
