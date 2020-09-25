import React from "react";
import { BaseForm, FormInput } from "src/util/components/form";
import { getElementsFrom, renderDomFactory } from "src/util/test/dom";

const getProps = () => ({
  setValues: jest.fn(),
  className: "testcase",
  setErrors: jest.fn(),
});

const submit = (container: HTMLElement) => {
  const form = getElementsFrom(container).byTagName("form").asSingle();
  form.submit();
};

const setValueInput = (container: HTMLElement, value: string) => {
  const input = getElementsFrom(container).byTagName("input").asSingle();
  input.value = value;
};

describe("Normal system", () => {
  const renderDom = renderDomFactory(
    <BaseForm {...getProps()}>
      {[
        <FormInput propertyName="input" key="single">
          <input />
        </FormInput>,
      ]}
    </BaseForm>,
    getProps
  );

  it("set value when submit", () => {
    const {
      container,
      props: { setValues },
    } = renderDom();
    submit(container);
    expect(setValues).toBeCalledWith({ input: "" });
  });

  it("pass className", () => {
    const {
      container,
      props: { className },
    } = renderDom();
    const form = getElementsFrom(container).byTagName("form").asSingle();
    expect(form).toHaveProperty("className", className);
  });

  describe("use validate", () => {
    const renderDom = renderDomFactory(
      <BaseForm {...getProps()}>
        {[
          <FormInput
            propertyName="input"
            key="single"
            validate={(value) => value.length !== 0}
          >
            <input />
          </FormInput>,
        ]}
      </BaseForm>,
      getProps
    );

    it("block setting value", () => {
      const {
        container,
        props: { setValues, setErrors },
      } = renderDom();
      submit(container);
      expect(setValues).not.toBeCalled();
      expect(setErrors).toBeCalledWith({ input: false });
    });

    it("allow setting value", () => {
      const {
        container,
        props: { setValues, setErrors },
      } = renderDom();
      const value = "some value";
      setValueInput(container, value);
      submit(container);
      expect(setValues).toBeCalledWith({ input: value });
      expect(setErrors).not.toBeCalled();
    });
  });
});
