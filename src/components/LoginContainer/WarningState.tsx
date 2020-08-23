import React, { useMemo, memo } from "react";

// eslint-disable-next-line no-unused-vars
import { LoginFormData } from "./index";
import { WarningLabel } from "../WarningLabel";
import { DisplayContainer } from "../DisplayContainer";

interface WarningStateProps {
  className?: string;
  loginFormData: LoginFormData;
}

const NotYetWarningState: React.FC<WarningStateProps> = (props) => {
  const { isShownnLabel, warningKey } = useMemo(() => props.loginFormData, [
    props.loginFormData,
  ]);
  return (
    <WarningLabel isShown={isShownnLabel}>
      <DisplayContainer currentKey={warningKey}>
        <div key="noCommunicate">サーバーとの通信が失敗しました。</div>
        <div key="missAuth">
          認証に失敗しました。入力された情報が間違っています。
        </div>
      </DisplayContainer>
    </WarningLabel>
  );
};

const WarningState = memo(NotYetWarningState);
WarningState.displayName = "WarningState";

export { WarningState };
