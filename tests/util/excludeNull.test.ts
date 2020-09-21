import { excludeNull } from "../../src/util";

describe("Normal system", () => {
  it("pass not nullable value", () => {
    expect(() => excludeNull("not nullable")).not.toThrow();
  });
});

describe("Exception system", () => {
  it("pass nullable", () => {
    expect(() => excludeNull(undefined)).toThrow();
    expect(() => excludeNull(null)).toThrow();
  });
});
