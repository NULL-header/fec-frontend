import React from "react";
import Eye from "@material-ui/icons/Visibility";
import OffEye from "@material-ui/icons/VisibilityOff";
import { IconButton } from "@material-ui/core";

interface ToggleEyeIconProps extends BaseComponent {
  isShow: boolean;
  onClick: () => void;
}

export const ToggleEyeIcon: React.FC<ToggleEyeIconProps> = (props) => {
  const icon = props.isShow ? <Eye /> : <OffEye />;
  return (
    <IconButton className={props.className} onClick={props.onClick}>
      {icon}
    </IconButton>
  );
};
