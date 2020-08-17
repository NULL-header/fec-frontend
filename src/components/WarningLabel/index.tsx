import React from "react";

import { useStyles } from "./style";

interface WarningLabelProps {
  className?: string;
  isShow: boolean;
}

export const WarningLabel: React.FC<WarningLabelProps> = (props) => {
  const classes = useStyles({ isShow: props.isShow });
  const rootClassName =
    (props.className == null ? "" : props.className) + " " + classes.root;
  return <div className={rootClassName}>Error</div>;
};
