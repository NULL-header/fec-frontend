import React from "react";
// for to leave screen to debug
// eslint-disable-next-line no-unused-vars
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { getElementsFrom } from "../../../../src/util/test/dom";

describe("Normal system", () => {
  it("result is array", () => {
    render(<div />);
    const result = getElementsFrom().byTagName("div");
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

    expect(getElementsFrom(container).byTagName("div")).toHaveLength(3);
    expect(getElementsFrom().byTagName("div")).toHaveLength(4);
  });

  it("get div", () => {
    const { container } = render(<div />);

    const divs = getElementsFrom(container).byTagName("div");
    expect(() => divs.asSingle()).not.toThrow();
    expect(divs.asSingle()).toHaveProperty("tagName", "DIV");
  });
});
