import React from "react";
import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { mock } from "jest-mock-extended";
import { TextField } from "src/components";
import { getElementsFrom, renderDomFactory } from "src/util/test/dom";

const getProps = () => ({
  type: "text",
  ref: mock<React.MutableRefObject<HTMLInputElement>>(),
  forwardLabel: "forward",
  backLabel: "back",
  error: "error",
});

const renderDom = renderDomFactory(<TextField {...getProps()} />, getProps);

describe("Normal system", () => {
  describe("with auto render", () => {
    let result: ReturnType<typeof renderDom>;
    let ref: typeof result.props.ref;

    beforeEach(() => {
      result = renderDom();
      ref = result.props.ref;
    });

    it("pass ref", () => {
      expect(ref.current.tagName).toEqual("INPUT");
    });
  });

  describe("pass label", () => {
    it("string", () => {
      renderDom();
      expect(screen.getByText("forward")).toBeInTheDocument();
      expect(screen.getByText("back")).toBeInTheDocument();
    });

    it("element", () => {
      const testcase = ((<div>testcase</div>) as unknown) as string;
      renderDom({ forwardLabel: testcase, backLabel: testcase });
      const els = screen.getAllByText("testcase");
      expect(els).toHaveLength(2);
      els.forEach((e) => {
        const parent = e.parentElement;
        if (parent == null) throw new Error("nothing parent");
        expect(parent.tagName).toEqual("LABEL");
      });
    });

    it("no label", () => {
      const testcase = undefined as any;
      const { container } = renderDom({
        forwardLabel: testcase,
        backLabel: testcase,
      });
      const labels = getElementsFrom(container).byTagName("label");
      labels.forEach((e) => {
        expect(e.children).toHaveLength(0);
      });
    });
  });

  describe("pass error", () => {
    it("error", () => {
      const testcase = (<div>testcase</div>) as any;
      renderDom({ error: testcase } as any);
      const el = screen.getByText("testcase");
      expect(el).toBeInTheDocument();
      const parent = el.parentElement;
      if (parent == null) throw new Error("nothing parent");
      expect(parent.tagName).toEqual("LABEL");
    });

    it("no error", () => {
      const testcase = undefined as any;
      const { container } = renderDom({ error: testcase });
      const errorLabel = getElementsFrom(container).byTagName("label")[2];
      expect(errorLabel.children).toHaveLength(0);
    });
  });
});
