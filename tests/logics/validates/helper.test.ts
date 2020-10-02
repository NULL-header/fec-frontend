import { getErrorLabels } from "src/logics/validates";

describe("Normal system", () => {
  it("get label", () => {
    const labels = getErrorLabels({
      email: { failedReason: "too long" },
    } as any);
    expect(labels).toHaveProperty("email", "メールアドレスが長すぎます");
  });
});
