import React from "react";
import { FormLabel } from "src/util/components/form";
import {
  getElementsFrom,
  renderDomFactory,
} from "@null-header/react-test-util";

const getProps = () => ({
  className: "testclass",
  ref: jest.fn(),
});

const renderDom = renderDomFactory(
  <FormLabel {...getProps()}>
    <div />
  </FormLabel>,
  getProps
);

describe("Normal system", () => {
  it("pass className", () => {
    const {
      container,
      props: { className },
    } = renderDom();
    const div = getElementsFrom(container).byTagName("div").asSingle();
    expect(div).toHaveProperty("className", className);
  });

  it("pass no ref", () => {
    const {
      props: { ref },
    } = renderDom();
    expect(ref).not.toBeCalled();
  });
});
