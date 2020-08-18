import React, { useRef, useState, useCallback } from "react";

import { InputPlace } from "../InputPlace";
// eslint-disable-next-line no-unused-vars
import { GetRisedData } from "./index";

interface BaseInputProps extends BaseComponentProps {
  label: string;
  type: string;
  varidate: (arg: string) => string;
  children: BaseElement | BaseElement[];
}

interface BaseInputData {
  label: string;
}

export interface RisedData {
  value: string;
  isRegular: boolean;
}

export const BaseInput = React.forwardRef<GetRisedData, BaseInputProps>(
  (props, ref) => {
    const input = useRef((undefined as unknown) as HTMLInputElement);

    const [[data], setData] = useState([
      { label: props.label },
    ] as BaseInputData[]);

    const isError = useCallback((label: string) => label !== props.label, [
      props.label,
    ]);

    const validateInputValue = useCallback((): RisedData => {
      const value = input.current.value;
      const label = props.varidate(value);
      setData([{ label }]);
      const isRegular = !isError(label);
      return { isRegular, value };
      // eslint tells me to add props to array argument.
      // but I think props will be change small.
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.varidate]);

    passValueToRef<() => RisedData>(validateInputValue, ref);

    const { label } = data;
    const args = {
      label,
      type: props.type,
      ref: input,
      error: isError(label),
    };

    return <InputPlace {...args}>{props.children}</InputPlace>;
  }
);

const passValueToRef = function <T>(
  value: T,
  ref: ((instance: T | null) => void) | React.MutableRefObject<T | null> | null
) {
  if (ref == null) {
  } else if (typeof ref === "function") {
    ref(value);
  } else {
    ref.current = value;
  }
};
