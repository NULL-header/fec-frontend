import React from "react";
// for to leave screen to debug
// eslint-disable-next-line no-unused-vars
import { render, screen, RenderResult } from "@testing-library/react";
import "@testing-library/jest-dom";
import { InputPlace } from "src/components/InputPlace";

describe("Normal system", () => {
  let inputPlace: RenderResult;

  beforeEach(() => {
    inputPlace = render(<div />);
  });

  const rerender = (children: JSX.Element[] = [], options = {}) => {
    const props = {
      label: "TestCase",
      type: "text",
      error: false,
      ...options,
      children,
    };
    inputPlace.rerender(<InputPlace {...props} />);
    return props;
  };

  it("show set label", () => {
    const label = "TESTCASE";
    rerender([], { label });

    expect(inputPlace.getByText(label)).toBeInTheDocument();
  });

  it("insert a dom to InputPlace", () => {
    const children = [<div key="head">head</div>];
    rerender(children);

    expect(inputPlace.getByText("head")).toBeInTheDocument();
  });

  it("insert two doms to InputPlase", () => {
    const children = [<div key="1">head</div>, <div key="2">tail</div>];
    rerender(children);

    expect(inputPlace.getByText("head")).toBeInTheDocument();
    expect(inputPlace.getByText("tail")).toBeInTheDocument();
  });

  it("insert no any doms to InputPlace", () => {
    const rerenderFactory = () => rerender();
    expect(rerenderFactory).not.toThrow();
  });
});
