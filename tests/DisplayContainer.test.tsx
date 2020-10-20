import React from "react";
// for to leave screen to debug
// eslint-disable-next-line no-unused-vars
import { screen } from "@testing-library/react";
import { renderDomFactory } from "@null-header/react-test-util";
import "@testing-library/jest-dom";

import { DisplayContainer } from "src/components";

const getProps = () => ({ currentKey: "testcase0" });

describe("Normal system", () => {
  const renderDom = renderDomFactory(
    <DisplayContainer {...getProps()}>
      <div key="testcase0">testcase0</div>
      <div key="testcase1">testcase1</div>
      <div key="testcase2">testcase2</div>
    </DisplayContainer>,
    getProps
  );

  it("show element with key", () => {
    renderDom();
    expect(screen.getByText("testcase0")).toBeInTheDocument();
    expect(screen.queryByText("testcase1")).not.toBeInTheDocument();
    expect(screen.queryByText("testcase2")).not.toBeInTheDocument();
  });
});

describe("Exception system", () => {
  const renderDom = renderDomFactory(
    <DisplayContainer {...getProps()}>
      <div key="testcase0">testcase0</div>
      <div>testcase1</div>
    </DisplayContainer>,
    getProps
  );

  it("not enough a key", () => {
    renderDom();
    expect(screen.getByText("testcase0")).toBeInTheDocument();
    expect(() => renderDom({ currentKey: "testcase1" })).toThrow();
  });
});
