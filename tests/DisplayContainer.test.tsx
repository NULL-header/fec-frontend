import React from "react";
// for to leave screen to debug
// eslint-disable-next-line no-unused-vars
import { screen } from "@testing-library/react";
import { renderDomFactory } from "@null-header/react-test-util";
import "@testing-library/jest-dom";

import { DisplayContainer } from "src/components";

const prefix = "this is the ";
const testcase = "testcase";
const threeKeys = [...Array(3).keys()];

const makeKey = (e: number) => testcase + String(e);

const makeTarget = (key: string) => prefix + key;

const removeFromArray = function <T>(val: T, from: T[]) {
  const index = from.indexOf(val);
  const removed = from.slice();
  removed.splice(index, 1);
  return removed;
};

const getProps = () => ({ currentKey: "" });

describe("Normal system", () => {
  const renderDom = renderDomFactory(
    <DisplayContainer {...getProps()}>
      {threeKeys.map((e) => {
        const key = makeKey(e);
        const text = makeTarget(key);
        return <div key={key}>{text}</div>;
      })}
    </DisplayContainer>,
    getProps
  );

  it("show element with key", () => {
    threeKeys.forEach((e) => {
      const currentKey = makeKey(e);
      const target = makeTarget(currentKey);
      const keysWithoutCurrent = removeFromArray(e, threeKeys);
      renderDom({ currentKey });

      expect(screen.getByText(target)).toBeInTheDocument();

      keysWithoutCurrent.forEach((e) => {
        const target = makeTarget(makeKey(e));
        expect(screen.queryByText(target)).not.toBeInTheDocument();
      });
    });
  });
});

describe("Exception system", () => {
  const renderDom = renderDomFactory(
    <DisplayContainer {...getProps()}>
      <div>testcase1</div>
      <div key="testcase2">testcase2</div>
    </DisplayContainer>,
    getProps
  );

  it("not enough a key", () => {
    renderDom({ currentKey: "testcase2" });
    expect(screen.getByText("testcase2")).toBeInTheDocument();
    expect(() => renderDom({ currentKey: "testcase1" })).toThrowError();
  });
});
