import { getPropertyFromNullable } from "src/util";

describe("Normal system", () => {
  const value = { testcase: "testcase" } as any;
  it("get property", () => {
    const result = getPropertyFromNullable(value, "testcase");
    expect(result).toEqual("testcase");
  });

  it("get undefined", () => {
    const result = getPropertyFromNullable(value, "test");
    expect(result).toEqual(undefined);
  });
});
