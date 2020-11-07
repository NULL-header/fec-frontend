// eslint-disable-next-line no-unused-vars
import React, { useMemo, memo } from "react";

interface ChildProps extends BaseComponentProps {
  classes?: Record<string, string>;
}

type Child = React.ReactElement<ChildProps>;

interface ToggleDisplayContainerProps extends BaseComponentProps {
  isShownFirstChild: boolean;
  children: [Child, Child];
  classes?: Record<string, string>;
}

const NotYetToggleDisplayContainer: React.FC<ToggleDisplayContainerProps> = (
  props
) => {
  const container = useMemo(
    () =>
      React.cloneElement(
        props.isShownFirstChild ? props.children[0] : props.children[1],
        { className: props.className, classes: props.classes }
      ),
    [props]
  );

  return container;
};

const ToggleDisplayContainer = memo(NotYetToggleDisplayContainer);
ToggleDisplayContainer.displayName = "ToggleDisplayContainer";

export { ToggleDisplayContainer };
