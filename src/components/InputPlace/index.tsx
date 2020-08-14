import React from "react";
import { Tooltip, TextField, InputAdornment } from "@material-ui/core";

interface InputPlaceProps extends BaseComponent {
  className?: string;
  children: JSX.Element | JSX.Element[];
  tip: string;
  label: string;
  type: string;
}

export const InputPlace: React.FC<InputPlaceProps> = (props) => {
  const { startIcon, endIcon } = openItemsFromArray(
    {
      startIcon: undefined,
      endIcon: undefined,
    },
    props.children
  );

  return (
    <Tooltip title={props.tip} className={props.className}>
      <TextField
        label={props.label}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">{startIcon}</InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">{endIcon}</InputAdornment>
          ),
        }}
      />
    </Tooltip>
  );
};

// can get valiable which be Specified by key of the option object from array.
function openItemsFromArray<T>(
  option: { [key: string]: undefined },
  maybeArray: T[] | T
) {
  const isArray = Array.isArray(maybeArray);
  const keys = Object.keys(option);
  if (isArray) {
    const items = maybeArray as T[];
    if (keys.length !== items.length)
      throw new Error(
        "The function can only receive a array which equals the length both array, and keys of object."
      );
    const result: { [key: string]: T } = {};
    keys.map((e, i) => {
      result[e] = items[i];
    });
    return result;
  } else {
    const item = maybeArray as T;
    const result = { [keys[0]]: item };
    return result;
  }
}
