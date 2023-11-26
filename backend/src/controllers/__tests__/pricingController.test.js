import {
  calculateMargin,
  calculatePricePerGallon,
  calculateTotal,
  getAmountModifier,
  getStateModifier,
  getStatusModifier,
} from "../pricingController";

import * as pricingService from "../../services/pricingService";

describe("tests getting pricing modifiers for user", () => {
  const userId = 1;

  const mockGetUserState = jest.spyOn(pricingService, "getUserState");
  const mockGetUserStatus = jest.spyOn(pricingService, "getUserStatus");

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should return 2% - user in texas", async () => {
    mockGetUserState.mockResolvedValue("TX");

    let result = await getStateModifier(userId);

    expect(mockGetUserState).toBeCalledWith(userId);
    expect(result).toEqual(0.02);
  });

  it("should return 4% - user in texas", async () => {
    mockGetUserState.mockResolvedValue("CA");

    let result = await getStateModifier(userId);

    expect(mockGetUserState).toBeCalledWith(userId);
    expect(result).toEqual(0.04);
  });

  it("should return 1% - user requested before", async () => {
    mockGetUserStatus.mockResolvedValue(true);

    let result = await getStatusModifier(userId);

    expect(mockGetUserStatus).toBeCalledWith(userId);
    expect(result).toEqual(0.01);
  });

  it("should return 0% - user has not requested before", async () => {
    mockGetUserStatus.mockResolvedValue(false);

    let result = await getStatusModifier(userId);

    expect(mockGetUserStatus).toBeCalledWith(userId);
    expect(result).toEqual(0);
  });

  it("should return 2% - amount greater than 1000 gallons", async () => {
    let amount = 1001;

    let result = await getAmountModifier(amount);

    expect(result).toEqual(0.02);
  });

  it("should return 3% - amount less than 1000 gallons", async () => {
    let amount = 1000;

    let result = await getAmountModifier(amount);

    expect(result).toEqual(0.03);
  });
});

describe("tests margin calculation for user", () => {
  const userId = 1;

  const mockGetUserState = jest.spyOn(pricingService, "getUserState");
  const mockGetUserStatus = jest.spyOn(pricingService, "getUserStatus");

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should return .195 - user in texas, returning, amount > 1000", async () => {
    mockGetUserState.mockResolvedValue("TX");
    mockGetUserStatus.mockResolvedValue(true);

    let amount = 1001;

    let result = await calculateMargin(userId, amount);

    expect(mockGetUserState).toBeCalledWith(userId);
    expect(mockGetUserStatus).toBeCalledWith(userId);
    expect(result).toEqual(0.195);
  });

  it("should return .21 - user in texas, returning, amount == 1000", async () => {
    mockGetUserState.mockResolvedValue("TX");
    mockGetUserStatus.mockResolvedValue(true);

    let amount = 1000;

    let result = await calculateMargin(userId, amount);

    expect(mockGetUserState).toBeCalledWith(userId);
    expect(mockGetUserStatus).toBeCalledWith(userId);
    expect(result).toEqual(0.21);
  });

  it("should return .21 - user in texas, new, amount > 1000", async () => {
    mockGetUserState.mockResolvedValue("TX");
    mockGetUserStatus.mockResolvedValue(false);

    let amount = 1001;

    let result = await calculateMargin(userId, amount);

    expect(mockGetUserState).toBeCalledWith(userId);
    expect(mockGetUserStatus).toBeCalledWith(userId);
    expect(result).toEqual(0.21);
  });

  it("should return .225 - user in texas, new, amount == 1000", async () => {
    mockGetUserState.mockResolvedValue("TX");
    mockGetUserStatus.mockResolvedValue(false);

    let amount = 1000;

    let result = await calculateMargin(userId, amount);

    expect(mockGetUserState).toBeCalledWith(userId);
    expect(mockGetUserStatus).toBeCalledWith(userId);
    expect(result).toEqual(0.225);
  });

  it("should return .225 - user not in texas, returning, amount > 1000", async () => {
    mockGetUserState.mockResolvedValue("CA");
    mockGetUserStatus.mockResolvedValue(true);

    let amount = 1001;

    let result = await calculateMargin(userId, amount);

    expect(mockGetUserState).toBeCalledWith(userId);
    expect(mockGetUserStatus).toBeCalledWith(userId);
    expect(result).toEqual(0.225);
  });

  it("should return .24 - user not in texas, returning, amount == 1000", async () => {
    mockGetUserState.mockResolvedValue("CA");
    mockGetUserStatus.mockResolvedValue(true);

    let amount = 1000;

    let result = await calculateMargin(userId, amount);

    expect(mockGetUserState).toBeCalledWith(userId);
    expect(mockGetUserStatus).toBeCalledWith(userId);
    expect(result).toEqual(0.24);
  });

  it("should return .24 - user not in texas, new, amount > 1000", async () => {
    mockGetUserState.mockResolvedValue("CA");
    mockGetUserStatus.mockResolvedValue(false);

    let amount = 1001;

    let result = await calculateMargin(userId, amount);

    expect(mockGetUserState).toBeCalledWith(userId);
    expect(mockGetUserStatus).toBeCalledWith(userId);
    expect(result).toEqual(0.24);
  });

  it("should return .255 - user not in texas, new, amount == 1000", async () => {
    mockGetUserState.mockResolvedValue("CA");
    mockGetUserStatus.mockResolvedValue(false);

    let amount = 1000;

    let result = await calculateMargin(userId, amount);

    expect(mockGetUserState).toBeCalledWith(userId);
    expect(mockGetUserStatus).toBeCalledWith(userId);
    expect(result).toEqual(0.255);
  });
});

describe("tests price per gallon caluclation based on margin", () => {
  const userId = 1;

  const mockGetUserState = jest.spyOn(pricingService, "getUserState");
  const mockGetUserStatus = jest.spyOn(pricingService, "getUserStatus");

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should return 1.695 - user in texas, returning, amount > 1000", async () => {
    mockGetUserState.mockResolvedValue("TX");
    mockGetUserStatus.mockResolvedValue(true);

    let amount = 1001;

    let result = await calculatePricePerGallon(userId, amount);

    expect(mockGetUserState).toBeCalledWith(userId);
    expect(mockGetUserStatus).toBeCalledWith(userId);
    expect(result).toEqual(1.695);
  });

  it("should return 1.71 - user in texas, returning, amount == 1000", async () => {
    mockGetUserState.mockResolvedValue("TX");
    mockGetUserStatus.mockResolvedValue(true);

    let amount = 1000;

    let result = await calculatePricePerGallon(userId, amount);

    expect(mockGetUserState).toBeCalledWith(userId);
    expect(mockGetUserStatus).toBeCalledWith(userId);
    expect(result).toEqual(1.71);
  });

  it("should return 1.725 - user not in texas, returning, amount > 1000", async () => {
    mockGetUserState.mockResolvedValue("CA");
    mockGetUserStatus.mockResolvedValue(true);

    let amount = 1001;

    let result = await calculatePricePerGallon(userId, amount);

    expect(mockGetUserState).toBeCalledWith(userId);
    expect(mockGetUserStatus).toBeCalledWith(userId);
    expect(result).toEqual(1.725);
  });

  it("should return 1.74 - user not in texas, new, amount > 1000", async () => {
    mockGetUserState.mockResolvedValue("CA");
    mockGetUserStatus.mockResolvedValue(false);

    let amount = 1001;

    let result = await calculatePricePerGallon(userId, amount);

    expect(mockGetUserState).toBeCalledWith(userId);
    expect(mockGetUserStatus).toBeCalledWith(userId);
    expect(result).toEqual(1.74);
  });

  it("should return 1.755 - user not in texas, new, amount == 1000", async () => {
    mockGetUserState.mockResolvedValue("CA");
    mockGetUserStatus.mockResolvedValue(false);

    let amount = 1000;

    let result = await calculatePricePerGallon(userId, amount);

    expect(mockGetUserState).toBeCalledWith(userId);
    expect(mockGetUserStatus).toBeCalledWith(userId);
    expect(result).toEqual(1.755);
  });

  it("should throw error - missing amount", async () => {
    try {
      await calculatePricePerGallon(userId);
      fail("should throw error");
    } catch (error) {
      expect(error.message).toEqual("Invalid Amount");
    }
  });

  it("should throw error - type of amount is not a number", async () => {
    let amount = "aaaa";

    try {
      await calculatePricePerGallon(userId, amount);
      fail("should throw error");
    } catch (error) {
      expect(error.message).toEqual("Invalid Amount");
    }
  });
});

describe("tests calculating total", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should return 100", async () => {
    let result = await calculateTotal(10, 10);

    expect(result).toEqual(100);
  });

  it("should return 100", async () => {
    let result = await calculateTotal(1001, 1.695);

    expect(result).toEqual(1696.7);
  });
});
