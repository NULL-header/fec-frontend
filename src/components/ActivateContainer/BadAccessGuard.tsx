import React, { useMemo } from "react";
import { Redirect } from "react-router-dom";

import { mapAttr } from "src/util";

// eslint-disable-next-line no-unused-vars
import { Queries } from "./types";
import { useQueryRecord } from "src/customhook";

const areTrueAll = (arg: Record<string, boolean>) =>
  Object.values(arg).findIndex((e) => !e) === -1;

const areNonNullableProps = function <T extends Record<any, unknown>>(obj: T) {
  return areTrueAll(mapAttr(obj, (e) => e != null));
};

interface Props extends BaseComponentProps {
  children: React.ReactNode;
}

const Component: React.FC<Props> = (props) => {
  const queryRecord = useQueryRecord();
  const rendered = useMemo(() => {
    let rendered: React.ReactNode = <Redirect to="/home" />;
    if (areNonNullableProps(queryRecord as any)) rendered = props.children;
    return rendered;
  }, [props.children, queryRecord]);
  return rendered as any;
};

const BadAccessGuard = React.memo(Component);
BadAccessGuard.displayName = "BadAccessGuard";

export { BadAccessGuard };
