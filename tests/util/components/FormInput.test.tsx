// ref getRefSetter.test.tsx, decideMutableRef.test.tsx
// this target of test is maked with these.
import React from "react";
// for to leave screen to debug
// eslint-disable-next-line no-unused-vars
import { render, screen } from "@testing-library/react";
import { mock } from "jest-mock-extended";
import "@testing-library/jest-dom";

import { FormInput } from "../../../src/util/components";
import { getElementsBy } from "../../../src/util/test/dom";

interface RefCurrent extends Record<string, unknown> {
  testcase: HTMLInputElement;
}

describe("Normal system", () => {
  const renderDom = (options = {}) => {
    const props = {
      ref: mock<React.MutableRefObject<RefCurrent>>(),
      propertyName: "testcase",
      className: "testclass",
      ...options,
    };

    const domTree = render(
      <FormInput {...props}>
        <input />
      </FormInput>
    );

    return { container: domTree.container, props };
  };

  it("pass Ref", () => {
    const {
      container,
      props: { ref },
    } = renderDom();
    const testcase = "testcase";
    const input = getElementsBy.tagName("input", container).first();
    input.value = testcase;
    console.log(ref.current.testcase.value);
  });
});
