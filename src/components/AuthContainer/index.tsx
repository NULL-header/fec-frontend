import React from "react";

import { LoginContainer } from "../LoginContaier";
import { DisplayContainer } from "../DisplayContainer";
import { useStyles } from "./style";

interface AuthContainerProps {
  className?: string;
}

export const AuthContainer: React.FC<AuthContainerProps> = (props) => {
  const classes = useStyles();
  const componentMap: ComponentMap = new Map([
    ["login", <LoginContainer key="container" />],
  ]);
  return (
    <DisplayContainer
      currentName="login"
      componentMap={componentMap}
      className={classes.container}
    />
  );
};
