import React, { useMemo, useState, useCallback, useRef } from "react";

import { TextField, TextPasswordField } from "src/components";
import { BaseForm, FormInput, FormLabel } from "src/util/components/form";
import { TextReader } from "src/util/components";
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

const defaultStates = [
  {
    errors: ({ email: {}, name: {}, password: {} } as unknown) as Record<
      string,
      ValidatedResult
    >,
    isEqualPassword: true,
  },
];

const getRePasswordErrorLabels = (isRegular: boolean) =>
  isRegular ? undefined : "パスワードが違います";

const Component: React.FC<Props> = (props) => {
  const [states, setStates] = useState(defaultStates);
  const current = useCurrent(states);
  const rePasswordErrorLabels = useMemo(
    () => getRePasswordErrorLabels(current.isEqualPassword),
    [current.isEqualPassword]
  );
  const labels = useMemo(() => getErrorLabels(current.errors), [current]);
  const isShown = useVariable(props.isShownLabel);
  const warningKey = useVariable(props.warningKey);
  const className = useVariable(props.className);
  const passwordRef = useRef<() => string>(undefined as any);

  const insertErrors = useCallback(
    (arg: Record<string, ValidatedResult>) =>
      setStates([Object.assign({}, current, { errors: arg })]),
    [current]
  );

  const insertIsEqualPassword = useCallback(
    (arg: boolean) => {
      setStates([Object.assign({}, current, { isEqualPassword: arg })]);
    },
    [current]
  );

  const setValues = useCallback(
    (arg: Record<string, string>) => {
      const rePassword = passwordRef.current();
      const isEqualPassword = arg.password === rePassword;
      insertIsEqualPassword(isEqualPassword);
      if (isEqualPassword) props.setValues(arg);
    },
    // this rule is not working with props calling.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.setValues]
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
        <TextReader ref={passwordRef}>
          <TextPasswordField
            forwardLabel="rewrite password"
            error={rePasswordErrorLabels}
          />
        </TextReader>
      </FormLabel>
      <FormLabel>
        <button type="submit">create</button>
      </FormLabel>
    </BaseForm>
  );
};

const SignupForm = React.memo(Component);
SignupForm.displayName = "SignupForm";

export { SignupForm, warning };
