import React, { useMemo, memo } from "react";
import withStyles from "react-jss";

import { styles } from "./style";

interface WarningLabelProps extends BaseComponentProps {
  isShown: boolean;
  children: BaseElement;
  classes: Record<keyof typeof styles, string>;
}

const getStringFromNullable = (arg: string | undefined) =>
  arg == null ? "" : " " + arg;

const getSuffix = (arg: boolean) => (arg ? "" : "-hidden");

const NotYetWarningLabel: React.FC<WarningLabelProps> = (props) => {
  const className = useMemo(() => getStringFromNullable(props.className), [
    props.className,
  ]);
  const baseClassName = useMemo(
    () => props.classes.root + getSuffix(props.isShown),
    [props.classes.root, props.isShown]
  );
  const label = React.cloneElement(props.children, {
    className: baseClassName + className,
  });

  return label;
};

const WarningLabel = memo(withStyles(styles as any)(NotYetWarningLabel));
WarningLabel.displayName = "WarningLabel";

export { WarningLabel };
