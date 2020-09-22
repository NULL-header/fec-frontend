import React from "react";
import { render } from "@testing-library/react";

export const renderDomFactory = function <T extends Record<string, unknown>>(
  elements: React.ReactElement,
  props: T = {} as T
) {
  return (options = {}) => {
    const passedElements = React.cloneElement(elements, {
      ...options,
    });
    const domTree = render(passedElements);
    return { container: domTree.container, props: { ...props, ...options } };
  };
};
