import pricingValidator from "../pricingValidator";

describe("tests pricing validator", () => {
  it("should return true - valid amount", () => {
    let amount = 1000;

    let result = pricingValidator(amount);

    expect(result).toBe(true);
  });

  it("should return false - missing amount", () => {
    let amount = null;

    let result = pricingValidator(amount);

    expect(result).toBe(false);
  });

  it("should return false - invalid amount", () => {
    let amount = "1000";

    let result = pricingValidator(amount);

    expect(result).toBe(false);
  });
});
