import React, { memo } from "react";
import { EyeIcon, ClosedEyeIcon } from "src/components/icons";

import { ToggleDisplayContainer } from "src/components";

interface ToggleEyeIconProps extends BaseComponentProps {
  isShown: boolean;
  onClick: () => void;
}

const NotYetToggleEyeIcon: React.FC<ToggleEyeIconProps> = (props) => {
  return (
    <div className={props.className} onClick={props.onClick}>
      <ToggleDisplayContainer isShownFirstChild={props.isShown}>
        <EyeIcon />
        <ClosedEyeIcon />
      </ToggleDisplayContainer>
    </div>
  );
};

const ToggleEyeIcon = memo(NotYetToggleEyeIcon);
ToggleEyeIcon.displayName = "ToggleEyeIcon";

export { ToggleEyeIcon };
