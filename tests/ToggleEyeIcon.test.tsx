// this component be made with ToggleDisplayContainer.
// look that because it does not test duplicate, maybe.

import React from "react";
// for to leave screen to debug
// eslint-disable-next-line no-unused-vars
import { render, screen, RenderResult, waitFor } from "@testing-library/react";
import UserEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { ToggleEyeIcon } from "../src/components/ToggleEyeIcon";

const excludeNull = function <T>(arg: T) {
  if (arg == null) throw new Error("This value includes null");
  return arg as NonNullable<T>;
};

describe("Normal system", () => {
  let toggleEyeIcon: RenderResult;

  beforeEach(() => {
    toggleEyeIcon = render(<div />);
  });

  const rerender = (options = {}) => {
    const props = { isShown: true, onClick: jest.fn(), ...options };
    toggleEyeIcon.rerender(<ToggleEyeIcon {...props} />);
    return props;
  };

  const accessPathHtml = () => {
    const nullablePathElement = toggleEyeIcon.container.querySelector("path");
    const pathElement = excludeNull(nullablePathElement);
    return pathElement;
  };

  it("change icon toggle by isShown", async () => {
    rerender({ isShown: true });
    const firstIcon = accessPathHtml().outerHTML;
    rerender({ isShown: false });
    const secondIcon = accessPathHtml();
    console.log(firstIcon);
    expect(firstIcon).not.toEqual(secondIcon);
  });

  it("call onClick", () => {
    const props = rerender();
    const buttonElement = accessPathHtml();
    UserEvent.click(buttonElement);

    expect(props.onClick).toHaveBeenCalledTimes(1);
  });
});
