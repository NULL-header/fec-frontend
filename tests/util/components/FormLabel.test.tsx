import React from "react";
// for to leave screen to debug
// eslint-disable-next-line no-unused-vars
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { FormLabel } from "../../../src/util/components";

describe("Normal system", () => {
  const renderDom = (options = {}) => {
    const props = {
      className: "testclass",
      ref: jest.fn(),
      ...options,
    };
    render(
      <FormLabel {...props}>
        <div>testcase</div>
      </FormLabel>
    );

    return props;
  };
  it("pass className", () => {
    const { className } = renderDom();
    const div = screen.getByText("testcase");
    expect(div.className).toEqual(className);
  });

  it("pass no ref", () => {
    const { ref } = renderDom();
    expect(ref).not.toBeCalled();
  });
});
