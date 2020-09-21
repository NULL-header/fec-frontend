import React from "react";
// for to leave screen to debug
// eslint-disable-next-line no-unused-vars
import { render, screen } from "@testing-library/react";
import { mock } from "jest-mock-extended";
import "@testing-library/jest-dom";
import { RefFanctionally } from "src/util/components";
import { getElementsFrom, renderDomFactory } from "src/util/test/dom";

describe("Normal sytem", () => {
  const props = {
    ref: mock<React.MutableRefObject<HTMLDivElement>>(),
    className: "testcase",
  };

  const renderDom = renderDomFactory(
    <RefFanctionally {...props}>
      <div />
    </RefFanctionally>,
    props
  );

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
