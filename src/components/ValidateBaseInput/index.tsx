import React, {
  useRef,
  useState,
  useCallback,
  useMemo,
  memo,
  useEffect,
} from "react";

import { InputPlace } from "../InputPlace";

export interface ValidateBaseInputProps extends BaseComponentProps {
  label: string;
  type: string;
  validate: (arg: string) => string;
  children?: BaseElement | BaseElement[];
}

interface ValidateBaseInputData {
  label: string;
}

const NotYetValidateBaseInput = React.forwardRef<
  RaisedRecord,
  ValidateBaseInputProps
>((props, ref) => {
  const input = useRef<HTMLInputElement>(undefined as any);

  const assignedLabel = useMemo(() => props.label, [props.label]);

  const [[data], setData] = useState([
    { label: assignedLabel } as ValidateBaseInputData,
  ]);

  const isWarning = useCallback((label: string) => label !== assignedLabel, [
    assignedLabel,
  ]);

  const validateInputValue = useCallback((): RaisedData => {
    const value = input.current.value;
    const label = props.validate(value);
    setData([{ label }]);
    const isRegular = !isWarning(label);
    return { isRegular, value };
    // eslint say props is dependency, but i think like this code.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isWarning, props.validate]);

  useEffect(() => {
    if (ref == null || typeof ref === "function")
      throw new TypeError("Pass a normal ref");
    if (ref.current == null) ref.current = {} as RaisedRecord;
    ref.current[assignedLabel] = validateInputValue;
  }, [validateInputValue, assignedLabel, ref]);

  const label = useMemo(() => data.label, [data.label]);
  const error = useMemo(() => isWarning(label), [isWarning, label]);
  const inputType = useMemo(() => props.type, [props.type]);

  return (
    <InputPlace {...{ label, error, type: inputType, ref: input }}>
      {props.children}
    </InputPlace>
  );
});

const ValidateBaseInput = memo(NotYetValidateBaseInput);
ValidateBaseInput.displayName = "ValidateBaseInput";

export { ValidateBaseInput };
