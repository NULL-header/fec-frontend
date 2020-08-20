// eslint-disable-next-line no-unused-vars
import React, { ReactNode, useMemo } from "react";

interface ToggleDisplayContainerProps extends BaseComponentProps {
  isShowFirstChild: boolean;
  children: [BaseElement, BaseElement];
}

export const ToggleDisplayContainer: React.FC<ToggleDisplayContainerProps> = (
  props
) => {
  const container = useMemo(
    () =>
      React.cloneElement(
        props.isShowFirstChild ? props.children[0] : props.children[1],
        { className: props.className }
      ),
    [props]
  );

  return container;
};
