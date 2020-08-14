import React, { useState } from "react";
import { FormControl } from "@material-ui/core";
import update from "immutability-helper";

import { InputPlace } from "../InputPlace";
import { ToggleEyeIcon } from "../ToggleEyeIcon";

interface LoginContainerProps extends BaseComponent {
  className?: string;
}

type History = loginFormData[];

type EyeStateType = "show" | "hidden";

interface loginFormData {
  eyeState: EyeStateType;
}

export const LoginContainer: React.FC<LoginContainerProps> = (props) => {
  const [history, setHistory] = useState([{ eyeState: "show" }] as History);
  const current = history[history.length - 1];

  const insertHisotry = (arg: loginFormData) => {
    const next = update(history, { $push: [arg] });
    setHistory(next);
  };

  const onClickEye = () => {
    const next = update(current, {
      eyeState: { $set: eyeStateGen.next().value },
    });
    insertHisotry(next);
  };

  const eyeState = current.eyeState;
  return (
    <div className={props.className}>
      <FormControl>
        <InputPlace tip="mocktip" label="mocklabel" type="TextField">
          <div>mockicon</div>
        </InputPlace>
        <InputPlace tip="mocktip" label="mocklabel" type={eyeState}>
          <div>mockicon</div>
          <ToggleEyeIcon {...{ onClick: onClickEye, eyeState }} />
        </InputPlace>
      </FormControl>
    </div>
  );
};

const toggleEyeStete = (arg: EyeStateType): EyeStateType => {
  let state;
  switch (arg) {
    case "show":
      state = "hidden";
      break;
    case "hidden":
      state = "show";
      break;
    default:
      throw new Error("It may be happened some bugs");
  }
  return state as EyeStateType;
};

const eyeStateGen = (function* () {
  let value = "show" as EyeStateType;
  while (true) {
    const arg: EyeStateType = yield value;
    value = toggleEyeStete(arg == null ? value : arg);
  }
})();
