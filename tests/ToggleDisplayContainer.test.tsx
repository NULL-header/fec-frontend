import React from "react";
// for to leave screen to debug
// eslint-disable-next-line no-unused-vars
import { screen } from "@testing-library/react";
import { renderDomFactory } from "@null-header/react-test-util";
import "@testing-library/jest-dom";

import { ToggleDisplayContainer } from "src/components";

const getProps = () => ({ isShownFirstChild: true });
const renderDom = renderDomFactory(
  <ToggleDisplayContainer {...getProps()}>
    <div>first</div>
    <div>second</div>
  </ToggleDisplayContainer>,
  getProps
);

describe("Normal system", () => {
  it("sho label toggle", () => {
    const { rerender } = renderDom({ isShownFirstChild: true });
    expect(screen.getByText("first")).toBeInTheDocument();
    expect(screen.queryByText("second")).not.toBeInTheDocument();

    rerender({ isShownFirstChild: false });
    expect(screen.queryByText("first")).not.toBeInTheDocument();
    expect(screen.getByText("second")).toBeInTheDocument();
  });
});
