// eslint-disable-next-line no-unused-vars
import { CSSProperties } from "react";

type MassJss<T> = {
  [Key in keyof T]: T[Key] extends CSSProperties
    ? CSSProperties
    : Key extends keyof CSSProperties
    ? CSSProperties[Key]
    : MassJss<T[Key]>;
};

export const makeStyles = <T extends Record<string, any>>(styles: MassJss<T>) =>
  styles;
