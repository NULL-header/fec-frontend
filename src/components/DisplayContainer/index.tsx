import React from "react";

interface DisplayContainerProps extends Component {
  children: React.FC<Component>[];
}

export const DisplayContainer: React.FC<DisplayContainerProps> = (props) => {
  return <div></div>;
};
