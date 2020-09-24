import React from "react";
// for to leave screen to debug
// eslint-disable-next-line no-unused-vars
import { render, screen, RenderResult } from "@testing-library/react";
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

describe("Normal system", () => {
  let displayContainer: RenderResult;

  beforeEach(() => {
    displayContainer = render(<div />);
  });

  const rerender = (options = {}) => {
    const props = { currentKey: "", ...options };
    displayContainer.rerender(
      <DisplayContainer {...props}>
        {threeKeys.map((e) => {
          const key = makeKey(e);
          const text = makeTarget(key);
          return <div key={key}>{text}</div>;
        })}
      </DisplayContainer>
    );
    return props;
  };

  it("show element with key", () => {
    threeKeys.forEach((e) => {
      const currentKey = makeKey(e);
      const target = makeTarget(currentKey);
      const keysWithoutCurrent = removeFromArray(e, threeKeys);
      rerender({ currentKey });

      expect(displayContainer.getByText(target)).toBeInTheDocument();

      keysWithoutCurrent.forEach((e) => {
        const target = makeTarget(makeKey(e));
        expect(displayContainer.queryByText(target)).not.toBeInTheDocument();
      });
    });
  });
});

describe("Exception system", () => {
  let displayContainer: RenderResult;

  const rerender = (options = {}) => {
    const props = { currentKey: "", ...options };
    displayContainer.rerender(
      <DisplayContainer {...props}>
        <div>testcase1</div>
        <div key="testcase2">testcase2</div>
      </DisplayContainer>
    );
    return { props };
  };

  beforeEach(() => {
    displayContainer = render(<div />);
  });

  it("not enough a key", () => {
    rerender({ currentKey: "testcase2" });
    expect(displayContainer.getByText("testcase2")).toBeInTheDocument();
    expect(() => rerender({ currentKey: "testcase1" })).toThrowError();
  });
});
