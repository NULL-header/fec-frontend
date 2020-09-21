import React from "react";
// for to leave screen to debug
// eslint-disable-next-line no-unused-vars
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { getElementsFrom } from "../../../../src/util/test/dom";

describe("Normal system", () => {
  it("result is array", () => {
    render(<div />);
    const result = getElementsFrom().ByTagName("div");
    expect(Array.isArray(result)).toBeTruthy();
  });

  it("get divs", () => {
    const { container } = render(
      <>
        <div />
        <div />
        <div />
      </>
    );

    expect(getElementsFrom(container).ByTagName("div")).toHaveLength(3);
    expect(getElementsFrom().ByTagName("div")).toHaveLength(4);
  });

  it("get div", () => {
    const { container } = render(<div />);

    const divs = getElementsFrom(container).ByTagName("div");
    expect(() => divs.first()).not.toThrow();
    expect(divs.first()).toHaveProperty("tagName", "DIV");
  });
});
