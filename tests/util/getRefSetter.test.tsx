// eslint-disable-next-line no-unused-vars
import React from "react";
import { mock } from "jest-mock-extended";
import { getRefSetter } from "../../src/util";

describe("Normal system", () => {
  it("trans function", () => {
    const ref = mock<React.MutableRefObject<any>>();
    const resSetter = getRefSetter(ref);
    expect(resSetter).not.toHaveProperty("current");
    expect(typeof resSetter).toEqual("function");
  });
});
