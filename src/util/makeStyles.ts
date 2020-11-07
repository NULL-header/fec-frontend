// eslint-disable-next-line no-unused-vars
import { CSSProperties } from "react";
// eslint-disable-next-line no-unused-vars
import { createUseStyles, Theming } from "react-jss";

type MassJss<T, U> = {
  [Key in keyof T]: Key extends keyof CSSProperties
    ? CSSProperties[Key] | ((props: U) => CSSProperties[Key])
    : CSSProperties | MassJss<T[Key], U>;
};

type Branch<T, U> = T extends undefined
  ? () => Record<keyof U, string>
  : (arg: T) => Record<keyof U, string>;

export const makeStyles = <U extends Theming<any> | undefined = undefined>(
  theming?: U
) => <T extends Record<string, any> | undefined = undefined>(props?: T) => <
  V extends Record<string, any>
>(
  styles: U extends undefined
    ? MassJss<V, T>
    :
        | MassJss<V, T>
        | ((theme: U extends Theming<infer W> ? W : never) => MassJss<V, T>)
) => {
  return createUseStyles<U>(styles as any, { theming }) as Branch<T, V>;
};
