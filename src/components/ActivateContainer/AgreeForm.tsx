import React, { useCallback } from "react";

import { ToggleDisplayContainer, LinkButton } from "src/components";

import { WarningState } from "./WarningState";
// eslint-disable-next-line no-unused-vars
import { Queries, Warning } from "./types";
import { useQueryRecord } from "./useQueryRecord";

interface Props extends BaseComponentProps {
  onClick: (
    event: React.MouseEvent<HTMLButtonElement, React.MouseEvent>,
    queries: Queries
  ) => void;
  isShownLabel: boolean;
  warning: Warning;
  wasActivated: boolean;
}

const Component: React.FC<Props> = (props) => {
  const { onClick, warning, isShownLabel, wasActivated } = props;
  const queryRecord = useQueryRecord();
  const handleClick = useCallback(
    (e: any) => {
      return onClick(e, queryRecord as any);
    },
    [onClick, queryRecord]
  );

  return (
    <ToggleDisplayContainer isShownFirstChild={wasActivated}>
      <div>
        <div>認証に成功しました。</div>
        <LinkButton to="/login">Login</LinkButton>
      </div>
      <div>
        <div>ここに規約が入る</div>
        <WarningState isShown={isShownLabel} warning={warning} />
        <button onClick={handleClick}>同意する</button>
      </div>
    </ToggleDisplayContainer>
  );
};

const AgreeForm = React.memo(Component);
AgreeForm.displayName = "AgreeForm";

export { AgreeForm };
