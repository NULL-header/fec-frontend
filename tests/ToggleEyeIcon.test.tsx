// this component be made with ToggleDisplayContainer.
// look that because it does not test duplicate, maybe.

import React from "react";
// for to leave screen to debug
// eslint-disable-next-line no-unused-vars
import { screen } from "@testing-library/react";
import {
  getElementsFrom,
  renderDomFactory,
} from "@null-header/react-test-util";
import "@testing-library/jest-dom";

import { ToggleEyeIcon } from "src/components";

const getProps = () => ({ isShown: true, onClick: jest.fn() });
const renderDom = renderDomFactory(<ToggleEyeIcon {...getProps()} />, getProps);

describe("Normal system", () => {
  it("change icon toggle by isShown", async () => {
    const { rerender, container } = renderDom({ isShown: true });
    const firstIcon = getElementsFrom(container)
      .byTagName("path" as any)
      .asSingle().outerHTML;
    rerender({ isShown: false });
    const secondIcon = getElementsFrom(container)
      .byTagName("path" as any)
      .asSingle().outerHTML;
    expect(firstIcon).not.toEqual(secondIcon);
  });

  it("call onClick", () => {
    const {
      container,
      props: { onClick },
    } = renderDom();
    getElementsFrom(container).byTagName("button").asSingle().click();

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
