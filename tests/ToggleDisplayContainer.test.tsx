import React from "react";
// for to leave screen to debug
// eslint-disable-next-line no-unused-vars
import { render, screen, RenderResult } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ToggleDisplayContainer } from "../src/components/ToggleDisplayContainer";

describe("Normal system", () => {
  let toggleDisplayContainer: RenderResult;

  beforeEach(() => {
    toggleDisplayContainer = render(<div />);
  });

  const rerender = (options = {}) => {
    const props = { isShownFirstChild: true, ...options };
    toggleDisplayContainer.rerender(
      <ToggleDisplayContainer {...props}>
        <div>first</div>
        <div>second</div>
      </ToggleDisplayContainer>
    );
    return props;
  };

  it("show label toggle", () => {
    rerender({ isShownFirstChild: true });
    expect(toggleDisplayContainer.getByText("first")).toBeInTheDocument();
    expect(
      toggleDisplayContainer.queryByText("second")
    ).not.toBeInTheDocument();

    rerender({ isShownFirstChild: false });
    expect(toggleDisplayContainer.queryByText("first")).not.toBeInTheDocument();
    expect(toggleDisplayContainer.getByText("second")).toBeInTheDocument();
  });
});
