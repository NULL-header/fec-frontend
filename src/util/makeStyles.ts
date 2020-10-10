// eslint-disable-next-line no-unused-vars
import { CSSProperties } from "react";

type MassJss<T> = {
  [Key in keyof T]: T[Key] extends CSSProperties
    ? CSSProperties
    : Key extends keyof CSSProperties
    ? CSSProperties[Key]
    : {
        [NestKey in keyof T[Key]]: NestKey extends keyof CSSProperties
          ? CSSProperties[NestKey]
          : MassJss<T[Key][NestKey]>;
      };
};

export const makeStyles = <T extends Record<string, any>>(styles: MassJss<T>) =>
  styles;
