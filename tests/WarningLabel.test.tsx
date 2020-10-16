import React from "react";
// for to leave screen to debug
// eslint-disable-next-line no-unused-vars
import { screen } from "@testing-library/react";
import { renderDomFactory } from "@null-header/react-test-util";
import "@testing-library/jest-dom";

import { WarningLabel } from "src/components";

const getProps = () => ({ isShown: true });
const renderDom = renderDomFactory(
  <WarningLabel {...getProps()}>
    <div>child</div>
  </WarningLabel>,
  getProps
);

describe("Normal system", () => {
  it("show label", () => {
    renderDom({ isShown: true });

    const el = screen.getByText("child");
    expect(el).toBeInTheDocument();

    const style = window.getComputedStyle(el);
    expect(style).toHaveProperty("visibility", "initial");
  });

  it("hide label", () => {
    renderDom({ isShown: false });
    const el = screen.getByText("child");
    expect(el).toBeInTheDocument();

    const style = window.getComputedStyle(el);
    expect(style).toHaveProperty("visibility", "hidden");
  });
});
