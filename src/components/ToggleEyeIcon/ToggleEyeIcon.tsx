import React, { memo } from "react";
import { Eye, ClosedEye } from "src/components/icons";

import { ToggleDisplayContainer } from "src/components";

interface ToggleEyeProps extends BaseComponentProps {
  isShown: boolean;
  onClick: () => void;
}

const NotYetToggleEye: React.FC<ToggleEyeProps> = (props) => {
  return (
    <div className={props.className} onClick={props.onClick}>
      <ToggleDisplayContainer isShownFirstChild={props.isShown}>
        <Eye />
        <ClosedEye />
      </ToggleDisplayContainer>
    </div>
  );
};

const ToggleEye = memo(NotYetToggleEye);
ToggleEye.displayName = "ToggleEye";

export { ToggleEye };
