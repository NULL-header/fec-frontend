import React, { memo } from "react";

import { WarningLabel } from "../WarningLabel";
import { DisplayContainer } from "../DisplayContainer";
import { useVariable } from "../../costomhook";

export interface Info {
  email: string;
  password: string;
  name: string;
}

export type warning =
  | "noCommunicate"
  | "duplicateEmail"
  | "duplicateName"
  | "unknown";

interface WarningStateProps extends BaseComponentProps {
  warningKey: warning;
  isShown: boolean;
}

const NotYetWarningState: React.FC<WarningStateProps> = (props) => {
  const className = useVariable(props.className);
  const isShown = useVariable(props.isShown);
  const warningKey = useVariable(props.warningKey);

  // useApi(
  //  async (isMounted, didMounted) => {
  //    if (!didMounted()) return;
  //    insertHistory({ isShown: false } as WarningStateState);
  //    const res = await api.createUser(props.info);
  //    console.log(res);
  //    const next = {
  //      isShown: true,
  //      warningKey: getKeyFromRes(res, api),
  //    } as WarningStateState;
  //    if (isMounted()) insertHistory(next);
  //  },
  //  api,
  //  [props.info]
  // );

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

export const WarningState = memo(NotYetWarningState);
