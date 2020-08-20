import React, { memo } from "react";
import Email from "@material-ui/icons/Email";

// eslint-disable-next-line no-unused-vars
import { GetRisedData } from "./index";
// eslint-disable-next-line no-unused-vars
import { BaseInput } from "./BaseInput";

type EmailInputProps = BaseComponentProps;

const NotYetEmailInput = React.forwardRef<GetRisedData, EmailInputProps>(
  (props, ref) => {
    return (
      <BaseInput {...{ varidate, ref, label: "Email", type: "text" }}>
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

export const EmailInput = memo(NotYetEmailInput);
