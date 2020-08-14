import React from "react";

interface DisplayContainerProps extends BaseComponent {
  children: React.FC<BaseComponent>[];
}

export const DisplayContainer: React.FC<DisplayContainerProps> = (props) => {
  return <div></div>;
};
