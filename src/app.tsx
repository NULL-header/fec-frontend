import React from "react";

import { DisplayContainer } from "./components/DisplayContainer";

const aaa: React.FC<BaseComponent> = (props) => {
  return <div className={props.className}>aaa</div>;
};

const componentMap = new Map([["aaa", aaa]]);
export const App = () => (
  <DisplayContainer componentMap={componentMap} currentName="bbb" />
);
