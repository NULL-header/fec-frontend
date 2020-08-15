import React from "react";

import { LoginContainer } from "../LoginContaier";
import { ToggleDisplayContainer } from "../ToggleDisplayContainer";
import { useStyles } from "./style";

interface AuthContainerProps {
  className?: string;
}

export const AuthContainer: React.FC<AuthContainerProps> = (props) => {
  const [showFirst, setShowFirst] = React.useState(true);
  const classes = useStyles();

  return (
    <ToggleDisplayContainer
      className={classes.container}
      isShowFirstChild={showFirst}
    >
      <LoginContainer />
      <div>sign up</div>
    </ToggleDisplayContainer>
  );
};
