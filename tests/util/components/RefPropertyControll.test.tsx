import React from "react";
import { mock } from "jest-mock-extended";
import "@testing-library/jest-dom";
import { RefPropertyControll } from "src/util/components";
import { renderDomFactory, getElementsFrom } from "src/util/test/dom";

const getProps = () => ({
  ref: mock<React.MutableRefObject<Record<"div", HTMLDivElement>>>(),
  className: "testcase",
  propertyName: "div",
});

const renderDom = renderDomFactory(
  <RefPropertyControll {...getProps()}>
    <div />
  </RefPropertyControll>,
  getProps
);

describe("Normal system", () => {
  it("add property", () => {
    const {
      props: { ref },
    } = renderDom();
    expect(ref.current).toHaveProperty("div");
  });

  it("pass ref", () => {
    const {
      props: { ref },
    } = renderDom();
    expect(ref.current.div).toHaveProperty("tagName", "DIV");
  });

  it("pass className", () => {
    const className = "testClass";
    const { container } = renderDom({ className });
    const div = getElementsFrom(container).byTagName("div").asSingle();
    expect(div.className).toEqual(className);
  });
});
