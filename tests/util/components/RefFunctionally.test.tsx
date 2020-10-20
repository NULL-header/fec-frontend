import React from "react";
import { mock } from "jest-mock-extended";
import { RefFunctionally } from "src/util/components";
import {
  getElementsFrom,
  renderDomFactory,
} from "@null-header/react-test-util";

const getProps = () => ({
  ref: mock<React.MutableRefObject<HTMLDivElement>>(),
  className: "testcase",
});

const renderDom = renderDomFactory(
  <RefFunctionally {...getProps()}>
    <div />
  </RefFunctionally>,
  getProps
);

describe("Normal sytem", () => {
  it("pass className", () => {
    const {
      container,
      props: { className },
    } = renderDom();
    const div = getElementsFrom(container).byTagName("div").asSingle();
    expect(div).toHaveProperty("className", className);
  });

  it("pass ref", () => {
    const {
      props: { ref },
    } = renderDom();
    expect(ref.current).toHaveProperty("tagName", "DIV");
  });
});
