import React from "react";

interface LoginContainerProps extends BaseComponent {
  className?: string;
}

export const LoginContainer: React.FC<LoginContainerProps> = (props) => {
  return <div className={props.className}></div>;
};
