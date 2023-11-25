import validateQuote from "../quotesValidator";

describe("tests fuel quotes validator", () => {
  let fuelRequestData = {};

  beforeEach(() => {
    fuelRequestData = {
      amount: 10,
      totalPrice: 10.0,
      deliveryDate: new Date(),
    };
  });

  it("should return true - valid profile", () => {
    let result = validateQuote(fuelRequestData);

    expect(result).toBe(true);
  });

  it("should return false - missing amount", () => {
    delete fuelRequestData.amount;

    let result = validateQuote(fuelRequestData);

    expect(result).toBe(false);
  });

  it("should return false - missing total price", () => {
    delete fuelRequestData.totalPrice;

    let result = validateQuote(fuelRequestData);

    expect(result).toBe(false);
  });

  it("should return false - missing delivery date", () => {
    delete fuelRequestData.deliveryDate;

    let result = validateQuote(fuelRequestData);

    expect(result).toBe(false);
  });

  it("should return false - amount is not a number", () => {
    fuelRequestData.amount = "10";

    let result = validateQuote(fuelRequestData);

    expect(result).toBe(false);
  });

  it("should return false - total price is not a number", () => {
    fuelRequestData.totalPrice = "10";

    let result = validateQuote(fuelRequestData);

    expect(result).toBe(false);
  });

  it("should return false - delivery date is not a date", () => {
    fuelRequestData.deliveryDate = "Jan 1, 2000";

    let result = validateQuote(fuelRequestData);

    expect(result).toBe(false);
  });
});
