// eslint-disable-next-line no-unused-vars
import React from "react";
import { mock } from "jest-mock-extended";
import { passValueRef } from "src/util";

const value = 1;

describe("Normal system", () => {
  it("pass ref", () => {
    const ref = mock<React.MutableRefObject<number>>();
    passValueRef(ref, value);
    expect(ref.current).toEqual(value);
  });

  it("pass function", () => {
    const setter = jest.fn();
    passValueRef(setter, value);
    expect(setter).toBeCalledWith(value);
  });
});

describe("Exception system", () => {
  it("pass null", () => {
    expect(() => passValueRef(null, value)).toThrow();
  });
});
