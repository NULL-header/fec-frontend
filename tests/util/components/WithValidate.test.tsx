import React from "react";
import { mock } from "jest-mock-extended";
import {
  getElementsFrom,
  renderDomFactory,
} from "@null-header/react-test-util";
import { WithValidate, TextReader } from "src/util/components";
// eslint-disable-next-line no-unused-vars
import { ValidatedResult, Validate } from "src/util/components/types";

const getProps = () => ({
  validate: jest.fn(((arg: string) => {
    return { isRegular: true, value: arg };
  }) as Validate),
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
    const result = ref.current();
    expect(validate).toBeCalledWith(result.value);
  });

  it("pass className", () => {
    const {
      container,
      props: { className },
    } = renderDom();
    const input = getElementsFrom(container).byTagName("input").asSingle();
    expect(input).toHaveProperty("className", className);
  });

  describe("use Validate", () => {
    const getProps = () => ({
      validate: jest.fn(((arg: string) => {
        const isRegular = arg.length > 0;
        const value = arg;
        let failedReason;
        if (!isRegular) failedReason = "blank";
        return { isRegular, value, failedReason };
      }) as Validate),
      ref: mock<React.MutableRefObject<() => ValidatedResult>>(),
      className: "testcase",
    });

    it("regular", () => {
      const {
        container,
        props: { ref },
      } = renderDom(getProps());
      const input = getElementsFrom(container).byTagName("input").asSingle();
      const value = "testcase";
      input.value = value;
      const result = ref.current();
      expect(result.value).toEqual(value);
      expect(result.isRegular).toEqual(true);
    });

    it("iregular", () => {
      const {
        props: { ref },
      } = renderDom(getProps());
      const result = ref.current();

      expect(result.value).toEqual("");
      expect(result.isRegular).toEqual(false);
      expect(result.failedReason).toEqual("blank");
    });
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
