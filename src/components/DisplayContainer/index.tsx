import React from "react";

interface DisplayContainerProps extends BaseComponentProps {
  currentKey: string;
  children: KeyElement[];
}

export const DisplayContainer: React.FC<DisplayContainerProps> = (props) => {
  const selectedElement = props.children.filter(
    (e) => props.currentKey === e.key
  )[0]; // The key is not duplicated so the lengh of this array is one.
  const styledElement = React.cloneElement(selectedElement, {
    className: props.className,
  });

  return styledElement;
};
