import React, { memo, useMemo } from "react";
// name icon
import Pencil from "@material-ui/icons/Create";

// eslint-disable-next-line no-unused-vars
import { ValidateBaseInput } from "src/components";

const label = "Name";

const NotYetValidateNameInput = React.forwardRef<
  RaisedRecord,
  BaseComponentProps
>((props, ref) => {
  const className = useMemo(() => props.className, [props.className]);

  return (
    <ValidateBaseInput {...{ className, validate, ref, type: "text", label }}>
      <Pencil />
    </ValidateBaseInput>
  );
});

const validate = (name: string): string => {
  const reg = /^[-0-9A-Za-z]+$/i;
  const passCheckLength = name.length <= 255;
  const passCheckRegular = reg.test(name);
  const detail = passCheckLength
    ? passCheckRegular
      ? "Name"
      : "ハイフン以外の特殊記号を使用しています"
    : "名前が長すぎます";
  return detail;
};

export const ValidateNameInput = memo(NotYetValidateNameInput);
