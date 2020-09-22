import React from "react";
import { renderDomFactory } from "../../../src/util/test";

describe("Normal system", () => {
  it("call function made without error", () => {
    const renderDom = renderDomFactory(<div />);
    expect(renderDom).not.toThrow();
  });

  it("render dom", () => {
    const renderDom = renderDomFactory(<div />, { className: "testcase" });
    const {
      container,
      props: { className },
    } = renderDom();
    const div = container.getElementsByTagName("div")[0];
    expect(div).toHaveProperty("className", className);
  });
});
