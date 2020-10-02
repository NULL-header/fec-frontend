import { PasswordValidate } from "src/logics/validates";

describe("Normal system", () => {
  let validate: typeof PasswordValidate.validate;

  beforeEach(() => {
    validate = PasswordValidate.validate;
  });

  it("pass value", () => {
    const value = "testcase";
    expect(validate(value).value).toEqual(value);
  });

  describe("validate", () => {
    it("sucess", () => {
      const value = "testcase";
      const result = validate(value);
      expect(result.isRegular).toBeTruthy();
      expect(result).toHaveProperty("failedReason", undefined);
    });

    describe("failed", () => {
      it("too short", () => {
        const value = "testca";
        const result = validate(value);
        expect(result.isRegular).toBeFalsy();
        expect(result.failedReason).toEqual("too short");
      });

      it("blank", () => {
        const value = "";
        const result = validate(value);
        expect(result.isRegular).toBeFalsy();
        expect(result.failedReason).toEqual("blank");
      });
    });
  });
});
