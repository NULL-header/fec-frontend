import React from "react";
import { Paper } from "@material-ui/core";

import { LoginContainer } from "../LoginContainer";
import { CreateContainer } from "../CreateContainer";
import { ToggleDisplayContainer } from "../ToggleDisplayContainer";
import { useStyles } from "./style";

interface AuthContainerProps {
  className?: string;
}

export const AuthContainer: React.FC<AuthContainerProps> = (props) => {
  const [showFirst, _setShowFirst] = React.useState(false);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.cloth}>
        <ToggleDisplayContainer
          className={classes.container}
          isShownFirstChild={showFirst}
        >
          <LoginContainer />
          <CreateContainer />
        </ToggleDisplayContainer>
      </Paper>
    </div>
  );
};
