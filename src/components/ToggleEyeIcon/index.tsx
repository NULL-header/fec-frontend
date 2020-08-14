import React from "react";
import Eye from "@material-ui/icons/Visibility";
import OffEye from "@material-ui/icons/VisibilityOff";

import { DisplayContainer } from "../DisplayContainer";

interface ToggleEyeIconProps extends BaseComponent {
  eyeState: string;
  onClick: () => void;
}

const eyeMap = new Map([
  ["show", Eye],
  ["hidden", OffEye],
]);

export const ToggleEyeIcon: React.FC<ToggleEyeIconProps> = (props) => {
  return (
    <DisplayContainer componentMap={eyeMap} currentName={props.eyeState} />
  );
};
