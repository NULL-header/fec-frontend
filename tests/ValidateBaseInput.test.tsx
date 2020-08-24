// ref InputPlace.test.tsx
// this component uses InputPlace

import React from "react";
// for to leave screen to debug
// eslint-disable-next-line no-unused-vars
import { render, screen, RenderResult } from "@testing-library/react";
import { mock } from "jest-mock-extended";
import { act } from "react-dom/test-utils";
import "@testing-library/jest-dom";
import { ValidateBaseInput } from "../src/components/ValidateBaseInput";

const excludeNull = function <T>(arg: T) {
  if (arg == null) throw new Error("This value includes null");
  return arg as NonNullable<T>;
};

const getInput = (component: RenderResult) => {
  const nullableInput = component.container.querySelector("input");
  const input = excludeNull(nullableInput);
  return input;
};

describe("Normal system", () => {
  let validateBaseInput: RenderResult;
  let props: { ref: React.RefObject<RaisedRecord>; validate: jest.Mock };
  let current: RaisedRecord;
  let input: HTMLInputElement;
  let raised: RaisedData;

  beforeEach(() => {
    validateBaseInput = render(<div />);
    props = rerender();
    current = excludeNull(props.ref.current);
    input = getInput(validateBaseInput);
    raised = {} as RaisedData;
  });

  const rerender = (options = {}) => {
    const props = {
      label: "TestCase",
      type: "text",
      validate: jest.fn(),
      ref: mock<React.RefObject<RaisedRecord>>(),
      ...options,
    };
    validateBaseInput.rerender(<ValidateBaseInput {...props} />);
    return props;
  };

  const setValueToRaised = () =>
    act(() => {
      raised = current.TestCase();
    });

  it("add method as attribute to current", () => {
    const secondCase = "SecondCase";
    const props = rerender({ label: secondCase });
    const current = excludeNull(props.ref.current);

    expect(current).toHaveProperty(secondCase);
    expect(typeof current.SecondCase).toEqual("function");
  });

  it("get empty value of input", () => {
    setValueToRaised();
    expect(raised.isRegular).toEqual(false);
    expect(raised.value).toEqual("");
  });

  it("get value of input", () => {
    const testcase = "testcase";

    input.value = testcase;
    setValueToRaised();
    expect(raised.value).toEqual(testcase);
  });

  it("call validate", () => {
    act(() => {
      current.TestCase();
    });
    expect(props.validate).toBeCalledTimes(1);
  });

  describe("use validate", () => {
    const reg = /[0-9]+/;
    const validate = (inputValue: string) => {
      return reg.test(inputValue) ? "TestCase" : "ERROR";
    };

    let props: { ref: React.RefObject<RaisedRecord>; validate: jest.Mock };
    let current: RaisedRecord;
    let input: HTMLInputElement;

    beforeEach(() => {
      props = rerender({ validate });
      current = excludeNull(props.ref.current);
      input = getInput(validateBaseInput);
    });

    const setValueToRaised = () =>
      act(() => {
        raised = current.TestCase();
      });

    it("default", () => {
      expect(validateBaseInput.getByText("TestCase")).toBeInTheDocument();
    });

    it("success", () => {
      input.value = "109";
      setValueToRaised();
      expect(raised.isRegular).toEqual(true);
      expect(validateBaseInput.getByText("TestCase")).toBeInTheDocument();
      expect(validateBaseInput.queryByText("ERROR")).not.toBeInTheDocument();
    });

    it("failed", () => {
      input.value = "testcase";
      setValueToRaised();
      expect(raised.isRegular).toEqual(false);
      expect(validateBaseInput.queryByText("TestCase")).not.toBeInTheDocument();
      expect(validateBaseInput.getByText("ERROR")).toBeInTheDocument();
    });
  });
});
