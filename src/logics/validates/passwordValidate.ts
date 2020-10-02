// eslint-disable-next-line no-unused-vars
import { Validate } from "src/util/components/types";

const getIsRegularLength = (arg: string) => arg.length > 6;

const getIsBlank = (arg: string) => arg.length > 0;

const getIsRegulars = (arg: string) => ({
  length: getIsRegularLength(arg),
  blank: getIsBlank(arg),
});

export const validate: Validate = (value) => {
  const isRegulars = getIsRegulars(value);
  let failedReason;
  if (!isRegulars.blank) failedReason = "blank";
  else if (!isRegulars.length) failedReason = "too short";
  return { isRegular: failedReason == null, value, failedReason };
};

export const reasonMapJp: Record<string, string> = {
  "too short": "パスワードが短すぎます",
  blank: "入力欄が空です",
};
