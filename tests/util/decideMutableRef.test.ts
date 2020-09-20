// eslint-disable-next-line no-unused-vars
import React from "react";
import { mock } from "jest-mock-extended";
import { decideMutableRef } from "../../src/util";

describe("Normal system", () => {
  it("decide mutable", () => {
    const ref = mock<React.MutableRefObject<any>>();
    expect(() => decideMutableRef(ref)).not.toThrow();
    expect(decideMutableRef(ref)).toEqual(ref);
  });
});

describe("Exception system", () => {
  it("pass function", () => {
    const testcase = () => {
      return;
    };
    expect(() => decideMutableRef(testcase)).toThrow();
  });
  it("pass null", () => {
    expect(() => decideMutableRef(null)).toThrow();
  });
});
