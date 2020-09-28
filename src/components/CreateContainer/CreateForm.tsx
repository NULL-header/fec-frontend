import React, { useMemo, useState, useCallback } from "react";

import { TextField, TextPasswordField } from "src/components";
import { BaseForm, FormInput, FormLabel } from "src/util/components/form";
// eslint-disable-next-line no-unused-vars
import { ValidatedResult } from "src/util/components/types";
import { useCurrent, useVariable } from "src/util/customhook";
import {
  EmailValidate,
  NameValidate,
  PasswordValidate,
  getErrorLabels,
} from "src/logics/validates";

import { WarningState, warning } from "./WarningState";

export interface Infos {
  email: string;
  password: string;
  name: string;
}

interface Props extends BaseComponentProps {
  setValues: (arg: Record<string, string>) => void;
  isShownLabel: boolean;
  warningKey: warning;
}

const defaultErrors = [
  ({ email: {}, name: {}, password: {} } as unknown) as Record<
    string,
    ValidatedResult
  >,
];

const Component: React.FC<Props> = (props) => {
  const [errors, setErrors] = useState(defaultErrors);
  const current = useCurrent(errors);
  const labels = useMemo(() => getErrorLabels(current), [current]);
  const isShown = useVariable(props.isShownLabel);
  const warningKey = useVariable(props.warningKey);
  const setValues = useVariable(props.setValues);
  const className = useVariable(props.className);

  const insertErrors = useCallback(
    (arg: Record<string, ValidatedResult>) =>
      setErrors([Object.assign({}, current, arg)]),
    [current]
  );

  return (
    <BaseForm {...{ setValues, setErrors: insertErrors, className }}>
      <FormLabel>
        <WarningState {...{ isShown, warningKey }} />
      </FormLabel>
      <FormInput propertyName="email" validate={EmailValidate.validate}>
        <TextField error={labels.email} type="email" forwardLabel="email" />
      </FormInput>
      <FormInput propertyName="name" validate={NameValidate.validate}>
        <TextField error={labels.name} type="text" forwardLabel="name" />
      </FormInput>
      <FormInput propertyName="password" validate={PasswordValidate.validate}>
        <TextPasswordField error={labels.password} forwardLabel="password" />
      </FormInput>
      <FormLabel>
        <button type="submit">create</button>
      </FormLabel>
    </BaseForm>
  );
};

const CreateForm = React.memo(Component);
CreateForm.displayName = "CreateForm";

export { CreateForm, warning };
