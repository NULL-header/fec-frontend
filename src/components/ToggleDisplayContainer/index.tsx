// eslint-disable-next-line no-unused-vars
import React, { ReactNode, useMemo } from "react";

interface ToggleDisplayContainerProps extends BaseComponentProps {
  isShownFirstChild: boolean;
  children: [BaseElement, BaseElement];
}

export const ToggleDisplayContainer: React.FC<ToggleDisplayContainerProps> = (
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
