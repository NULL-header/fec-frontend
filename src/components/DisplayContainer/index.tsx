import React from "react";

interface DisplayContainerProps extends BaseComponentProps {
  componentMap: ComponentMap;
  currentName: string;
}

export const DisplayContainer: React.FC<DisplayContainerProps> = (props) => {
  const elementOptional = props.componentMap.get(props.currentName);
  if (elementOptional == null)
    throw new Error(
      "The component can be recieve a only currentName which there is in the keys ofcomponentMap"
    );
  const styledElement = React.cloneElement(elementOptional, {
    className: props.className,
  });

  return styledElement;
};
