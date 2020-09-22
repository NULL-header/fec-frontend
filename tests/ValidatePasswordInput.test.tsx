// ref ValidateBaseInput.test.tsx, ToggleEyeIcon.test.tsx

import React from "react";
// for to leave screen to debug
// eslint-disable-next-line no-unused-vars
import { render, screen, RenderResult } from "@testing-library/react";
import { mock } from "jest-mock-extended";
import { act } from "react-dom/test-utils";
import UserEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { ValidatePasswordInput } from "src/components/ValidatePasswordInput";

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
  let validatePasswordInput: RenderResult;
  let props: { ref: React.RefObject<RaisedRecord> };
  let current: RaisedRecord;
  let input: HTMLInputElement;

  beforeEach(() => {
    validatePasswordInput = render(<div />);
    props = rerender();
    current = excludeNull(props.ref.current);
    input = getInput(validatePasswordInput);
  });

  const rerender = (options = {}) => {
    const props = { ref: mock<React.RefObject<RaisedRecord>>(), ...options };
    validatePasswordInput.rerender(<ValidatePasswordInput {...props} />);
    return props;
  };

  it("add method Password as attribute to current", () => {
    expect(current).toHaveProperty("Password");
    expect(typeof current.Password).toEqual("function");
  });

  describe("click event", () => {
    let button: HTMLButtonElement;

    beforeEach(() => {
      const nullableButton = validatePasswordInput.container.querySelector(
        "button"
      );
      button = excludeNull(nullableButton);
    });

    it("default type", () => {
      expect(input.type).toEqual("password");
    });

    it("toggle every click", () => {
      UserEvent.click(button);
      expect(input.type).toEqual("text");
      UserEvent.click(button);
      expect(input.type).toEqual("password");
    });
  });

  describe("validate", () => {
    let raised: RaisedData;

    beforeEach(() => {
      raised = {} as RaisedData;
    });

    const setValueToRaised = () =>
      act(() => {
        raised = current.Password();
      });

    it("default", () => {
      expect(validatePasswordInput.getByText("Password")).toBeInTheDocument();
    });

    describe("success", () => {
      it("Password", () => {
        const successCase = "4903orelfkd$_^-";
        input.value = successCase;
        setValueToRaised();
        expect(raised.value).toEqual(successCase);
        expect(raised.isRegular).toEqual(true);
        expect(validatePasswordInput.getByText("Password")).toBeInTheDocument();
      });
    });

    describe("failed", () => {
      it("too short", () => {
        const tooShortCase = "abcd";
        input.value = tooShortCase;
        setValueToRaised();
        expect(raised.value).toEqual(tooShortCase);
        expect(raised.isRegular).toEqual(false);
        expect(
          validatePasswordInput.getByText("パスワードが短すぎます")
        ).toBeInTheDocument();
      });
    });
  });
});
