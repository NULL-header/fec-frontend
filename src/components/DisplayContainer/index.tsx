import React, { useMemo, memo } from "react";

interface DisplayContainerProps extends BaseComponentProps {
  currentKey: string;
  children: KeyElement[];
}

const NotYetDisplayContainer: React.FC<DisplayContainerProps> = (props) => {
  const selectedElement = useMemo(
    // The key is not duplicated so the lengh of this array is one.
    () => props.children.filter((e) => props.currentKey === e.key)[0],
    [props.currentKey, props.children]
  );

  const styledElement = useMemo(
    () =>
      React.cloneElement(selectedElement, {
        className: props.className,
      }),
    [selectedElement, props.className]
  );

  return styledElement;
};

export const DisplayContainer = memo(NotYetDisplayContainer);
