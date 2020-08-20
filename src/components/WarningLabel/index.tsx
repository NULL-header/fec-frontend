import React, { useMemo, memo } from "react";

import { useStyles } from "./style";

interface WarningLabelProps {
  className?: string;
  isShow: boolean;
  children: BaseElement;
}

const NotYetWarningLabel: React.FC<WarningLabelProps> = (props) => {
  const classes = useStyles({ isShow: props.isShow });

  const rootClassName = useMemo(
    () => (props.className == null ? "" : props.className) + " " + classes.root,
    [props.className, classes.root]
  );

  const label = useMemo(() => props.children, [props.children]);

  return <div className={rootClassName}>{label}</div>;
};

export const WarningLabel = memo(NotYetWarningLabel);
