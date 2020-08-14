import React, { useState } from "react";
import { FormControl } from "@material-ui/core";

import { InputPlace } from "../InputPlace";

interface LoginContainerProps extends BaseComponent {
  className?: string;
}

interface loginFormData {
  isPassword: boolean;
}

type History = loginFormData[];

export const LoginContainer: React.FC<LoginContainerProps> = (props) => {
  const [history, setHistory] = useState([{ isPassword: true }] as History);
  return (
    <div className={props.className}>
      <FormControl>
        <InputPlace tip="mocktip" label="mocklabel" type="TextField">
          <div>mockicon</div>
        </InputPlace>
        <InputPlace tip="mocktip" label="mocklabel" type="TextField">
          <div>mockicon</div>
        </InputPlace>
      </FormControl>
    </div>
  );
};
