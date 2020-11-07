import React, { useMemo, memo } from "react";

import { createGetSuffix } from "src/util";
import { useClassName } from "src/util/customhook";
import { useStyles } from "./style";

interface WarningLabelProps extends BaseComponentProps {
  isShown: boolean;
  children: BaseElement;
}

const getSuffix = createGetSuffix("-hidden");

const NotYetWarningLabel: React.FC<WarningLabelProps> = (props) => {
  const classes = useStyles();
  const baseClassName = useMemo(
    () => classes.root + getSuffix(!props.isShown),
    [classes.root, props.isShown]
  );
  const className = useClassName(baseClassName, props.className);
  const label = React.cloneElement(props.children, {
    className: className,
  });

  return label;
};

const WarningLabel = memo(NotYetWarningLabel);
WarningLabel.displayName = "WarningLabel";

export { WarningLabel };
