import React from "react";

import { WarningLabel, DisplayContainer } from "src/components";

export type warning =
  | "noCommunicate"
  | "duplicateEmail"
  | "duplicateName"
  | "unknown";

interface Props extends BaseComponentProps {
  warningKey: warning;
  isShown: boolean;
}

const Component: React.FC<Props> = (props) => {
  const { isShown, warningKey, className } = props;

  return (
    <WarningLabel {...{ isShown, className }}>
      <DisplayContainer currentKey={warningKey}>
        <div key="noCommunicate">サーバーとの通信が失敗しました。</div>
        <div key="duplicateEmail">
          入力されたメールアドレスはすでに使用されています。
        </div>
        <div key="duplicateName">入力された名前はすでに使用されています。</div>
        <div key="unknown">未知のエラーが発生しました。</div>
      </DisplayContainer>
    </WarningLabel>
  );
};

const WarningState = React.memo(Component);
WarningState.displayName = "WarningState";

export { WarningState };
