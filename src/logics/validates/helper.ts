import { EmailValidate, NameValidate, PasswordValidate } from ".";
// eslint-disable-next-line no-unused-vars
import { ValidatedResult } from "src/util/components/types";
import { getPropertyFromNullable } from "src/util";

const reasonMaps = {
  email: EmailValidate,
  name: NameValidate,
  password: PasswordValidate,
} as Record<string, { reasonMapJp: any }>;

const getLabelsFrom = (arg: Record<string, ValidatedResult>) => (
  key: string
): string => {
  const reason = getPropertyFromNullable(arg[key], "failedReason");
  return reason == null ? undefined : reasonMaps[key].reasonMapJp[reason];
};

export const getErrorLabels = (arg: Record<string, ValidatedResult>) => {
  const labelGetter = getLabelsFrom(arg);
  return {
    email: labelGetter("email"),
    name: labelGetter("name"),
    password: labelGetter("password"),
  };
};
