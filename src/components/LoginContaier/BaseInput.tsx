import React, {
  useRef,
  useState,
  useCallback,
  useMemo,
  memo,
  useEffect,
} from "react";

import { InputPlace } from "../InputPlace";
// eslint-disable-next-line no-unused-vars
import { GetRisedData, RisedData } from "./index";

interface BaseInputProps extends BaseComponentProps {
  label: string;
  type: string;
  varidate: (arg: string) => string;
  children: BaseElement | BaseElement[];
}

interface BaseInputData {
  label: string;
}

const NotYetBaseInput = React.forwardRef<GetRisedData, BaseInputProps>(
  (props, ref) => {
    const input = useRef<HTMLInputElement>(undefined as any);

    const [[data], setData] = useState([
      { label: props.label } as BaseInputData,
    ]);

    const isError = useCallback((label: string) => label !== props.label, [
      props.label,
    ]);

    const validateInputValue = useCallback((): RisedData => {
      const value = input.current.value;
      const label = props.varidate(value);
      setData([{ label }]);
      const isRegular = !isError(label);
      return { isRegular, value };
      // eslint say props is dependency, but i think like this code.
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isError, props.varidate]);

    useEffect(() => passValueToRef<GetRisedData>(validateInputValue, ref), [
      ref,
      validateInputValue,
    ]);
    const label = useMemo(() => data.label, [data.label]);
    const error = useMemo(() => isError(label), [isError, label]);
    const inputType = useMemo(() => props.type, [props.type]);

    return (
      <InputPlace {...{ label, error, type: inputType, ref: input }}>
        {props.children}
      </InputPlace>
    );
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

export const BaseInput = memo(NotYetBaseInput);
