import React from "react";
import Eye from "@material-ui/icons/Visibility";
import OffEye from "@material-ui/icons/VisibilityOff";
import { IconButton } from "@material-ui/core";
import { ToggleDisplayContainer } from "../ToggleDisplayContainer";

interface ToggleEyeIconProps extends BaseComponentProps {
  isShow: boolean;
  onClick: () => void;
}

export const ToggleEyeIcon: React.FC<ToggleEyeIconProps> = (props) => {
  return (
    <IconButton className={props.className} onClick={props.onClick}>
      <ToggleDisplayContainer isShowFirstChild={props.isShow}>
        <Eye />
        <OffEye />
      </ToggleDisplayContainer>
    </IconButton>
  );
};
