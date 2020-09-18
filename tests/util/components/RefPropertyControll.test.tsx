import React from "react";
// for to leave screen to debug
// eslint-disable-next-line no-unused-vars
import { render, screen } from "@testing-library/react";
import { mock } from "jest-mock-extended";
import "@testing-library/jest-dom";
import { RefPropertyControll } from "src/util/components";
import { renderDomFactory, getElementsFrom } from "src/util/test/dom";

describe("Normal system", () => {
  const props = {
    ref: mock<React.MutableRefObject<Record<"div", HTMLDivElement>>>(),
    className: "testcase",
    propertyName: "div",
  };
  const renderDom = renderDomFactory(
    <RefPropertyControll {...props}>
      <div />
    </RefPropertyControll>,
    props
  );

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
