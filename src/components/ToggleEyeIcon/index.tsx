import React, { memo } from "react";
import Eye from "@material-ui/icons/Visibility";
import OffEye from "@material-ui/icons/VisibilityOff";
import { IconButton } from "@material-ui/core";
import { ToggleDisplayContainer } from "../ToggleDisplayContainer";

interface ToggleEyeIconProps extends BaseComponentProps {
  isShown: boolean;
  onClick: () => void;
}

const NotYetToggleEyeIcon: React.FC<ToggleEyeIconProps> = (props) => {
  return (
    <IconButton className={props.className} onClick={props.onClick}>
      <ToggleDisplayContainer isShownFirstChild={props.isShown}>
        <Eye />
        <OffEye />
      </ToggleDisplayContainer>
    </IconButton>
  );
};

const ToggleEyeIcon = memo(NotYetToggleEyeIcon);
ToggleEyeIcon.displayName = "ToggleEyeIcon";

export { ToggleEyeIcon };
