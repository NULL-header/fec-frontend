// ref ValidateBaseInput.test.tsx

import React from "react";
// for to leave screen to debug
// eslint-disable-next-line no-unused-vars
import { render, screen, RenderResult } from "@testing-library/react";
import { mock } from "jest-mock-extended";
import { act } from "react-dom/test-utils";
import "@testing-library/jest-dom";

import { ValidateNameInput } from "src/components";

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
  let validateNameInput: RenderResult;
  let props: { ref: React.RefObject<RaisedRecord> };
  let current: RaisedRecord;

  beforeEach(() => {
    validateNameInput = render(<div />);
    props = rerender();
    current = excludeNull(props.ref.current);
  });

  const rerender = (options = {}) => {
    const props = { ref: mock<React.RefObject<RaisedRecord>>(), ...options };
    validateNameInput.rerender(<ValidateNameInput {...props} />);
    return props;
  };

  it("add method Name as attribute to current", () => {
    expect(current).toHaveProperty("Name");
    expect(typeof current.Name).toEqual("function");
  });

  describe("validate", () => {
    let input: HTMLInputElement;
    let raised: RaisedData;

    beforeEach(() => {
      input = getInput(validateNameInput);
      raised = {} as RaisedData;
    });

    const setValueToRaised = () =>
      act(() => {
        raised = current.Name();
      });

    it("default", () => {
      expect(validateNameInput.getByText("Name")).toBeInTheDocument();
    });

    describe("failed", () => {
      it("too long", () => {
        const tooLongCase = [...Array(256).keys()].join("");
        input.value = tooLongCase;
        setValueToRaised();
        expect(raised.value).toEqual(tooLongCase);
        expect(raised.isRegular).toEqual(false);
        expect(
          validateNameInput.getByText("名前が長すぎます")
        ).toBeInTheDocument();
      });

      it("use special symbol", () => {
        const symbolCase = "abcdefg$_-";
        input.value = symbolCase;
        setValueToRaised();
        expect(raised.value).toEqual(symbolCase);
        expect(raised.isRegular).toEqual(false);
        expect(
          validateNameInput.getByText("ハイフン以外の特殊記号を使用しています")
        ).toBeInTheDocument();
      });
    });

    describe("success", () => {
      it("Name", () => {
        const successCase = "example-example";
        input.value = successCase;
        setValueToRaised();
        expect(raised.value).toEqual(successCase);
        expect(raised.isRegular).toEqual(true);
        expect(validateNameInput.getByText("Name")).toBeInTheDocument();
      });
    });
  });
});
