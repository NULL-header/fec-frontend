// eslint-disable-next-line no-unused-vars
import React, { useMemo, memo } from "react";

interface ToggleDisplayContainerProps extends BaseComponentProps {
  isShownFirstChild: boolean;
  children: [BaseElement, BaseElement];
}

const NotYetToggleDisplayContainer: React.FC<ToggleDisplayContainerProps> = (
  props
) => {
  const container = useMemo(
    () =>
      React.cloneElement(
        props.isShownFirstChild ? props.children[0] : props.children[1],
        { className: props.className }
      ),
    [props]
  );

  return container;
};

const ToggleDisplayContainer = memo(NotYetToggleDisplayContainer);
ToggleDisplayContainer.displayName = "ToggleDisplayContainer";

export { ToggleDisplayContainer };
