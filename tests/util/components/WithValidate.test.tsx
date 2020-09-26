import React from "react";
import { mock } from "jest-mock-extended";
import { getElementsFrom, renderDomFactory } from "src/util/test/dom";
import { WithValidate, TextReader } from "src/util/components";
// eslint-disable-next-line no-unused-vars
import { ValidatedResult } from "src/util/types";

const getProps = () => ({
  validate: jest.fn(() => true),
  ref: mock<React.MutableRefObject<() => ValidatedResult>>(),
  className: "testcase",
});

const renderDom = renderDomFactory(
  <WithValidate {...getProps()}>
    <TextReader>
      <input />
    </TextReader>
  </WithValidate>,
  getProps
);

describe("Normal system", () => {
  it("pass ref", () => {
    const {
      container,
      props: { ref },
    } = renderDom();
    const input = getElementsFrom(container).byTagName("input").asSingle();
    const value = "testcase";
    const expectedResult = {
      value,
      isRegular: true,
    } as ValidatedResult;
    input.value = value;
    expect(ref.current()).toEqual(expectedResult);
  });

  it("call validate", () => {
    const {
      props: { ref, validate },
    } = renderDom();
    expect(validate).toBeCalledWith(ref.current().value);
    expect(validate()).toEqual(ref.current().isRegular);
  });

  it("pass className", () => {
    const {
      container,
      props: { className },
    } = renderDom();
    const input = getElementsFrom(container).byTagName("input").asSingle();
    expect(input).toHaveProperty("className", className);
  });
});

describe("Exception system", () => {
  it("pass div to ref", () => {
    const getProps = () => ({
      validate: jest.fn(),
      ref: mock<React.MutableRefObject<() => ValidatedResult>>(),
    });

    const renderDom = renderDomFactory(
      <WithValidate {...getProps()}>
        <div />
      </WithValidate>,
      getProps
    );

    const {
      props: { ref },
    } = renderDom();

    expect(() => ref.current()).toThrow();
  });
});
