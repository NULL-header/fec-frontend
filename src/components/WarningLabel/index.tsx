import React, { useMemo, memo } from "react";

import { useStyles } from "./style";

interface WarningLabelProps extends BaseComponentProps {
  isShown: boolean;
  children: BaseElement;
}

const NotYetWarningLabel: React.FC<WarningLabelProps> = (props) => {
  const classes = useStyles({ isShown: props.isShown });

  const rootClassName = useMemo(
    () => (props.className == null ? "" : props.className) + " " + classes.root,
    [props.className, classes.root]
  );

  const label = React.cloneElement(props.children, {
    className: rootClassName,
  });

  return label;
};

const WarningLabel = memo(NotYetWarningLabel);
WarningLabel.displayName = "WarningLabel";

export { WarningLabel };
