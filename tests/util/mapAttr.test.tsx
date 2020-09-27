import { mapAttr } from "src/util";

describe("Normal system", () => {
  it("return value each attribute with callback", () => {
    const value = { props1: "props1", props2: "props2" };
    const expectedValue = { props1: "the props1", props2: "the props2" };
    const result = mapAttr(value, (e) => "the " + e);
    expect(result).toEqual(expectedValue);
  });
});
