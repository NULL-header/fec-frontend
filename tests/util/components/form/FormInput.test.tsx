// ref RefPropertyControll.test.tsx, TextReader.test.tsx, WithValidate.test.tsx.
// this target of test is maked with these.
import React from "react";
import { mock } from "jest-mock-extended";
import "@testing-library/jest-dom";

import { FormInput } from "src/util/components/form";
// eslint-disable-next-line no-unused-vars
import { ValidatedResult } from "src/util/components/types";
import {
  getElementsFrom,
  renderDomFactory,
} from "@null-header/react-test-util";

interface RefCurrent extends Record<string, () => ValidatedResult> {
  testcase: () => ValidatedResult;
}

const getProps = () => ({
  ref: mock<React.MutableRefObject<RefCurrent>>(),
  propertyName: "testcase",
  className: "testclass",
});

const renderDom = renderDomFactory(
  <FormInput {...getProps()}>
    <input />
  </FormInput>,
  getProps
);

const value = "testcase-input";
const validatedResult = { value, isRegular: true };

const getInput = (container: HTMLElement) =>
  getElementsFrom(container).byTagName("input").asSingle();

const setValueInput = (container: HTMLElement, settedValue: string) => {
  const input = getInput(container);
  input.value = settedValue;
};

describe("Normal system", () => {
  it("pass Ref", () => {
    const {
      container,
      props: { ref },
    } = renderDom();
    setValueInput(container, value);
    expect(ref.current.testcase()).toEqual(validatedResult);
  });

  it("pass className", () => {
    const {
      container,
      props: { className },
    } = renderDom();
    const input = getInput(container);
    expect(input).toHaveProperty("className", className);
  });
});
