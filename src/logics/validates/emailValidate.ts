// eslint-disable-next-line no-unused-vars
import { Validate } from "src/util/components/types";

const format = /^[\w+-.]+@[a-z\d-]+(.[a-z\d-]+)*.[a-z]+$/i;

const getIsRegularFormat = (arg: string) => format.test(arg);

const getIsRegularLength = (arg: string) => arg.length <= 255;

const getIsBlank = (arg: string) => arg.length > 0;

const getIsRegulars = (arg: string) => ({
  format: getIsRegularFormat(arg),
  length: getIsRegularLength(arg),
  blank: getIsBlank(arg),
});

export const validate: Validate = (value) => {
  const isRegulars = getIsRegulars(value);
  let failedReason;
  if (!isRegulars.blank) failedReason = "blank";
  else if (!isRegulars.length) failedReason = "too long";
  else if (!isRegulars.format) failedReason = "not formatted";
  return { isRegular: failedReason == null, value, failedReason };
};

export const reasonMapJp: Record<string, string> = {
  "too long": "メールアドレスが長すぎます",
  "not formatted": "不正な形式です",
  blank: "入力欄が空です",
};
