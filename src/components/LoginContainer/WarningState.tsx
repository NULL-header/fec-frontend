import React, { memo } from "react";

import { WarningLabel, DisplayContainer } from "src/components";

export type warning = "noCommunicate" | "missAuth" | "unknown";

interface Props {
  className?: string;
  warningKey: warning;
  isShown: boolean;
}

const Component: React.FC<Props> = (props) => {
  const { isShown, warningKey, className } = props;

  return (
    <WarningLabel {...{ isShown, className }}>
      <DisplayContainer currentKey={warningKey}>
        <div key="noCommunicate">サーバーとの通信が失敗しました。</div>
        <div key="missAuth">
          認証に失敗しました。入力された情報が間違っています。
        </div>
        <div key="unknown">未知のエラーが発生しました。</div>
      </DisplayContainer>
    </WarningLabel>
  );
};

const WarningState = memo(Component);
WarningState.displayName = "WarningState";

export { WarningState };
