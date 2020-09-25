import React, { memo, useCallback, useMemo, useRef } from "react";
import {
  // eslint-disable-next-line no-unused-vars
  RefComponentProps,
  // eslint-disable-next-line no-unused-vars
  BaseComponentProps,
  // eslint-disable-next-line no-unused-vars
  ValidatedResult,
} from "src/util/types";
import { mapAttr } from "src/util";
import { useVariable, useOptionalVariable } from "src/util/customhook";

type KeyStringRecord<T> = Record<string, T>;
type StringRecord = KeyStringRecord<string>;
type ValidateRecord = KeyStringRecord<() => ValidatedResult>;
type ResultRecord = KeyStringRecord<ValidatedResult>;
type RegularRecord = KeyStringRecord<boolean>;

interface BaseFormProps extends BaseComponentProps {
  children: React.ReactElement<RefComponentProps<ValidateRecord>>[];
  setValues: (arg: StringRecord) => void;
  setErrors?: (arg: RegularRecord) => void;
}

const getResults = (obj: ValidateRecord) => mapAttr(obj, (e) => e());

const getIsRegulars = (result: ResultRecord) =>
  mapAttr(result, (e) => e.isRegular);

const isTrueAll = (flagObj: Record<string, boolean>) =>
  Object.values(flagObj).find((e) => !e) == null;

const getValues = (result: ResultRecord) => mapAttr(result, (e) => e.value);

const NotYetBaseForm: React.FC<BaseFormProps> = (props) => {
  const transfer = useRef<ValidateRecord>(undefined as any);
  const setValues = useVariable(props.setValues);
  const setErrors = useOptionalVariable(props.setErrors, () => null);
  const className = useVariable(props.className);
  const children = useMemo(
    () => props.children.map((e) => React.cloneElement(e, { ref: transfer })),
    [props.children]
  );

  const onSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const result = getResults(transfer.current);
      const isRegulars = getIsRegulars(result);
      if (isTrueAll(isRegulars)) {
        const values = getValues(result);
        setValues(values);
      } else {
        setErrors(isRegulars);
      }
    },
    [setErrors, setValues]
  );

  return <form {...{ onSubmit, className }}>{children}</form>;
};

const BaseForm = memo(NotYetBaseForm);
BaseForm.displayName = "BaseForm";

export { BaseForm };
