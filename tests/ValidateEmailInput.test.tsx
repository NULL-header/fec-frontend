// ref ValidateBaseInput.test.tsx

import React from "react";
// for to leave screen to debug
// eslint-disable-next-line no-unused-vars
import { render, screen, RenderResult } from "@testing-library/react";
import { mock } from "jest-mock-extended";
import { act } from "react-dom/test-utils";
import "@testing-library/jest-dom";

import { ValidateEmailInput } from "src/components";

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
  let validateEmailInput: RenderResult;
  let props: { ref: React.RefObject<RaisedRecord> };
  let current: RaisedRecord;

  beforeEach(() => {
    validateEmailInput = render(<div />);
    props = rerender();
    current = excludeNull(props.ref.current);
  });

  const rerender = (options = {}) => {
    const props = { ref: mock<React.RefObject<RaisedRecord>>(), ...options };
    validateEmailInput.rerender(<ValidateEmailInput {...props} />);
    return props;
  };

  it("add method Email as attribute to current", () => {
    expect(current).toHaveProperty("Email");
    expect(typeof current.Email).toEqual("function");
  });

  describe("validate", () => {
    let input: HTMLInputElement;
    let raised: RaisedData;

    beforeEach(() => {
      input = getInput(validateEmailInput);
      raised = {} as RaisedData;
    });

    const setValueToRaised = () =>
      act(() => {
        raised = current.Email();
      });

    it("default", () => {
      expect(validateEmailInput.getByText("Email")).toBeInTheDocument();
    });

    describe("failed", () => {
      it("too long", () => {
        const tooLongCase = [...Array(256).keys()].join("");
        input.value = tooLongCase;
        setValueToRaised();
        expect(raised.value).toEqual(tooLongCase);
        expect(raised.isRegular).toEqual(false);
        expect(
          validateEmailInput.getByText("メールアドレスが長すぎます")
        ).toBeInTheDocument();
      });

      it("irregular", () => {
        const irregularCase = "abcdefg";
        input.value = irregularCase;
        setValueToRaised();
        expect(raised.value).toEqual(irregularCase);
        expect(raised.isRegular).toEqual(false);
        expect(
          validateEmailInput.getByText("メールアドレスの形式が不正です")
        ).toBeInTheDocument();
      });

      it("empty", () => {
        const emptyValue = "";
        input.value = emptyValue;
        setValueToRaised();
        expect(raised.isRegular).toEqual(false);
        const el = validateEmailInput.getByText("入力欄が空です");
        expect(el).toBeInTheDocument();
      });
    });

    describe("success", () => {
      it("email", () => {
        const successCase = "example@example.com";
        input.value = successCase;
        setValueToRaised();
        expect(raised.value).toEqual(successCase);
        expect(raised.isRegular).toEqual(true);
        expect(validateEmailInput.getByText("Email")).toBeInTheDocument();
      });
    });
  });
});
