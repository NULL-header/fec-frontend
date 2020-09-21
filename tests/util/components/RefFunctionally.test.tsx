import React from "react";
// for to leave screen to debug
// eslint-disable-next-line no-unused-vars
import { render, screen } from "@testing-library/react";
import { mock } from "jest-mock-extended";
import "@testing-library/jest-dom";
import { RefFanctionally } from "../../../src/util/components";
import { getElementsBy } from "../../../src/util/test/dom";

describe("Normal sytem", () => {
  const renderDom = (options = {}) => {
    const props = {
      ref: mock<React.MutableRefObject<HTMLDivElement>>(),
      className: "testcase",
      ...options,
    };
    const domTree = render(
      <RefFanctionally {...props}>
        <div />
      </RefFanctionally>
    );

    return { container: domTree.container, props };
  };

  it("pass className", () => {
    const {
      container,
      props: { className },
    } = renderDom();
    const div = getElementsBy.tagName("div", container).first();
    expect(div).toHaveProperty("className", className);
  });

  it("pass ref", () => {
    const {
      props: { ref },
    } = renderDom();
    expect(ref.current).toHaveProperty("tagName", "DIV");
  });
});
