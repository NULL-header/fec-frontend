// eslint-disable-next-line no-unused-vars
import { MutableRefObject, ReactElement } from "react";

export type Ref<T> =
  | ((instance: T) => void)
  | MutableRefObject<T | null>
  | null;

interface BaseComponentProps {
  className?: string;
}

export interface HadChildComponentProps<T = BaseComponentProps>
  extends BaseComponentProps {
  children: ReactElement<T>;
}

interface RefComponentProps<T = unknown> extends BaseComponentProps {
  ref: Ref<T>;
}

type UnPromisify<T> = T extends Promise<infer U> ? U : T;

export type AsyncReturnType<
  T extends (...args: any) => Promise<any>
> = UnPromisify<ReturnType<T>>;
