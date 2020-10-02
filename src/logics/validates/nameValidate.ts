// eslint-disable-next-line no-unused-vars
import { Validate } from "src/util/components/types";

const format = /^[-0-9A-Za-z]+$/i;

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
  "too long": "名前が長すぎます",
  "not formatted": "ハイフン以外の特殊記号を使用しています",
  blank: "入力欄が空です",
};
