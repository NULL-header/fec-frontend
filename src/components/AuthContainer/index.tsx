import React from "react";

import { LoginContainer } from "../LoginContaier";
import { DisplayContainer } from "../DisplayContainer";
import { useStyles } from "./style";

interface AuthContainerProps {
  className?: string;
}

const componentMap = new Map([["login", LoginContainer]]);

export const AuthContainer: React.FC<AuthContainerProps> = (props) => {
  const classes = useStyles();
  return (
    <DisplayContainer
      currentName="login"
      componentMap={componentMap}
      className={classes.container}
    />
  );
};
