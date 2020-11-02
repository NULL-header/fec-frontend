// no test because Nothing this have any logics.

import React, { useState, useMemo, useCallback } from "react";

import { TextField, ToggleEye } from "src/components";
import { useCurrent } from "src/util/customhook";

type PropsAll = Omit<
  Omit<
    Omit<React.ComponentPropsWithRef<typeof TextField>, "type">,
    "backLabel"
  >,
  "key"
>;
type Props = Omit<PropsAll, "ref">;

const Component = React.forwardRef<HTMLInputElement, Props>((props, ref) => {
  const [states, setStates] = useState([true]);
  const isShown = useCurrent(states);
  const textType = useMemo(() => (isShown ? "text" : "password"), [isShown]);
  const onClick = useCallback(() => {
    setStates([!isShown]);
    console.log("ok");
  }, [isShown]);

  return (
    <TextField
      {...{
        ...props,
        backLabel: <ToggleEye {...{ isShown, onClick }} />,
        type: textType,
        ref,
      }}
    />
  );
});

const TextPasswordField = React.memo(Component);
TextPasswordField.displayName = "TextPasswordField";

export { TextPasswordField };
