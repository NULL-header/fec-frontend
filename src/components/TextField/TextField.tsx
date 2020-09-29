import React, { useMemo } from "react";

// eslint-disable-next-line no-unused-vars
import { BaseComponentProps } from "src/util/types";
import { RefFunctionally } from "src/util/components";

interface Props extends BaseComponentProps {
  type: string;
  forwardLabel?: React.ReactNode;
  backLabel?: React.ReactNode;
  error?: string;
}

const useLabel = (arg: React.ReactNode) =>
  useMemo(() => <label>{arg}</label>, [arg]);

const Component = React.forwardRef<HTMLInputElement, Props>((props, ref) => {
  const error = useMemo(
    () => (
      <div>
        <label>{props.error}</label>
      </div>
    ),
    [props.error]
  );
  const forwardLabel = useLabel(props.forwardLabel);
  const backLabel = useLabel(props.backLabel);
  return (
    <div>
      {forwardLabel}
      <RefFunctionally {...{ ref }}>
        <input {...{ type: props.type }} />
      </RefFunctionally>
      {backLabel}
      {error}
    </div>
  );
});

const TextField = React.memo(Component);
TextField.displayName = "TextField";

export { TextField };
