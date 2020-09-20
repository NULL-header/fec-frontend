// eslint-disable-next-line no-unused-vars
import React from "react";
import { mock } from "jest-mock-extended";
import { isMutableRef } from "src/util";

describe("Normal system", () => {
  it("function", () => {
    const testcase = () => {
      return;
    };
    expect(isMutableRef(testcase)).toBeFalsy();
  });
  it("null", () => {
    expect(isMutableRef(null)).toBeFalsy();
  });
  it("mutable", () => {
    const ref = mock<React.MutableRefObject<any>>();
    expect(isMutableRef(ref)).toBeTruthy();
  });
});
