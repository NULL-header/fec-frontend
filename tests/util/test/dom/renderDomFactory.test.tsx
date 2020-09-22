import React from "react";
import { renderDomFactory } from "src/util/test/dom";

const getProps = () => ({ className: "testcase" });
const renderDom = renderDomFactory(<div />, getProps);

describe("Normal system", () => {
  it("call function made without error", () => {
    expect(renderDom).not.toThrow();
  });

  it("render dom", () => {
    const {
      container,
      props: { className },
    } = renderDom();
    const div = container.getElementsByTagName("div")[0];
    expect(div).toHaveProperty("className", className);
  });
});
