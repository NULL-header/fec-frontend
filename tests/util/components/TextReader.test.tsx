import React from "react";
import { mock } from "jest-mock-extended";

import { TextReader } from "src/util/components";
import { renderDomFactory, getElementsFrom } from "src/util/test/dom";

const getProps = () => ({ ref: mock<React.MutableRefObject<() => string>>() });

const renderDom = renderDomFactory(
  <TextReader>
    <input />
  </TextReader>,
  getProps
);

const value = "testcase";

const setValueInput = (el: HTMLElement, settedValue: string) => {
  const input = getElementsFrom(el).byTagName("input").asSingle();
  input.value = settedValue;
};

describe("Normal system", () => {
  it("get getter", () => {
    const {
      props: { ref },
    } = renderDom();
    expect(ref.current).not.toThrow();
    expect(ref.current()).toEqual("");
  });

  it("get value", () => {
    const {
      container,
      props: { ref },
    } = renderDom();
    setValueInput(container, value);
    expect(ref.current()).toEqual(value);
  });
});
