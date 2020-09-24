import React from "react";
// for to leave screen to debug
// eslint-disable-next-line no-unused-vars
import { render, screen, RenderResult } from "@testing-library/react";
import "@testing-library/jest-dom";

import { WarningLabel } from "src/components";

describe("Normal system", () => {
  let warningLabel: RenderResult;

  beforeEach(() => {
    warningLabel = render(<div />);
  });

  const rerender = (options = {}) => {
    const props = { isShown: true, ...options };
    warningLabel.rerender(
      <WarningLabel {...props}>
        <div>child</div>
      </WarningLabel>
    );
    return props;
  };

  it("show label", () => {
    rerender({ isShown: true });

    const el = warningLabel.getByText("child");
    expect(el).toBeInTheDocument();

    const style = window.getComputedStyle(el);
    expect(style).toHaveProperty("visibility", "initial");
  });

  it("hide label", () => {
    rerender({ isShown: false });
    const el = warningLabel.getByText("child");
    expect(el).toBeInTheDocument();

    const style = window.getComputedStyle(el);
    expect(style).toHaveProperty("visibility", "hidden");
  });
});
