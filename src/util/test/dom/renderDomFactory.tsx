import React from "react";
import { render } from "@testing-library/react";

export const renderDomFactory = function <T, U extends Partial<T>>(
  elements: React.ReactElement,
  getProps: () => T = () => ({} as T)
) {
  return (options = {} as U) => {
    const props = getProps();
    const passedElements = React.cloneElement(elements, {
      ...props,
      ...options,
    });
    const domTree = render(passedElements);
    return { container: domTree.container, props: { ...props, ...options } };
  };
};
