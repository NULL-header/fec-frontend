import React, { useCallback, useMemo, useState } from "react";

// eslint-disable-next-line no-unused-vars
import { BaseComponentProps } from "src/util/types";
// eslint-disable-next-line no-unused-vars
import { ValidatedResult } from "src/util/components/types";
import { BaseForm, FormInput, FormLabel } from "src/util/components/form";
import { TextField, TextPasswordField } from "src/components";
import {
  EmailValidate,
  PasswordValidate,
  getErrorLabels,
} from "src/logics/validates";

// eslint-disable-next-line no-unused-vars
import { warning, WarningState } from "./WarningState";
import { useCurrent } from "src/util/customhook";

export interface Infos {
  email: string;
  password: string;
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
  const { isShownLabel, setValues, className, warningKey } = props;

  const insertErrors = useCallback(
    (arg: Record<string, ValidatedResult>) =>
      setErrors([Object.assign({}, current, arg)]),
    [current]
  );

  return (
    <BaseForm {...{ setValues, className, setErrors: insertErrors }}>
      <FormLabel>
        <WarningState {...{ isShown: isShownLabel, warningKey }} />
      </FormLabel>
      <FormInput propertyName="email" validate={EmailValidate.validate}>
        <TextField error={labels.email} type="email" forwardLabel="email" />
      </FormInput>
      <FormInput propertyName="password" validate={PasswordValidate.validate}>
        <TextPasswordField error={labels.password} forwardLabel="password" />
      </FormInput>
      <FormLabel>
        <button type="submit">log in</button>
      </FormLabel>
    </BaseForm>
  );
};

const LoginForm = React.memo(Component);
LoginForm.displayName = "LoginForm";

export { LoginForm };
