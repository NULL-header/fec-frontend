import React from "react";

import { DisplayContainer, WarningLabel } from "src/components";

// eslint-disable-next-line no-unused-vars
import { Warning } from "./types";

interface Props extends BaseComponentProps {
  warning: Warning;
  isShown: boolean;
}

const Component: React.FC<Props> = (props) => {
  const { warning, isShown, className } = props;
  return (
    <WarningLabel {...{ isShown, className }}>
      <DisplayContainer currentKey={warning}>
        <div key="noCommunicate">サーバーとの通信に失敗しました。</div>
        <div key="missAuth">
          有効なURLではありませんでした。再度アカウントを作成してください。
        </div>
        <div key="unknown">未知のエラーが発生しました。</div>
      </DisplayContainer>
    </WarningLabel>
  );
};

const WarningState = React.memo(Component);
WarningState.displayName = "WarningState";

export { WarningState };
