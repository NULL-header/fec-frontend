import React from "react";
import Email from "@material-ui/icons/Email";

// eslint-disable-next-line no-unused-vars
import { BaseInput, RisedData } from "./BaseInput";

type EmailInputProps = BaseComponentProps;

export const EmailInput = React.forwardRef<() => RisedData, EmailInputProps>(
  (props, ref) => {
    return (
      <BaseInput label="Email" {...{ varidate, ref, type: "text" }}>
        <Email />
      </BaseInput>
    );
  }
);

const varidate = (email: string): string => {
  const reg = /^[\w+-.]+@[a-z\d-]+(.[a-z\d-]+)*.[a-z]+$/i;
  const passCheckLength = email.length <= 255;
  const passCheckRegular = reg.test(email);
  const detail = passCheckLength
    ? passCheckRegular
      ? "Email"
      : "メールアドレスの形式が不正です"
    : "メールアドレスが長すぎます";
  return detail;
};
