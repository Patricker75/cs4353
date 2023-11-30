import {
  createNewFuelQuote,
  getUserFuelQuote,
  getUserQuoteHistory,
} from "../quotesController";

import * as quoteService from "../../services/quotesServices";

describe("tests creating a fuel quote", () => {
  const userId = 1;
  let requestData = {};
  const fuelRequestId = 20;

  const mockAddFuelQuote = jest.spyOn(quoteService, "addFuelQuote");
  const mockUpdateUserStatus = jest.spyOn(quoteService, "updateUserStatus");

  beforeEach(() => {
    jest.resetAllMocks();

    requestData = {
      amount: 10,
      unitPrice: 10,
      totalPrice: 100.0,
      deliveryAddress: "123 Street",
      deliveryDate: new Date(2023, 11, 1),
    };
  });

  it("should create a new fuel quote and update user status - valid quote", async () => {
    mockAddFuelQuote.mockResolvedValue(fuelRequestId);
    mockUpdateUserStatus.mockResolvedValue();

    let result = await createNewFuelQuote(userId, requestData);

    expect(mockAddFuelQuote).toBeCalledWith(userId, requestData);
    expect(mockUpdateUserStatus).toBeCalledWith(userId);
    expect(result).toEqual(fuelRequestId);
    expect(typeof result).toEqual("number");
  });

  it("should throw error - invalid quote", async () => {
    delete requestData.amount;

    try {
      await createNewFuelQuote(userId, requestData);
      fail("should throw error");
    } catch (error) {
      expect(error.message).toEqual("Invalid Quote");
      expect(mockAddFuelQuote).not.toBeCalled();
      expect(mockUpdateUserStatus).not.toBeCalled();
    }
  });
});

describe("tests getting a fuel quote", () => {
  const userId = 1;
  const fuelRequestId = 20;
  const fuelRequest = {
    userId,
    requestId: fuelRequestId,
    amount: 10,
    unitPrice: 10,
    totalPrice: 100.0,
    deliveryAddress: "123 Street",
    deliveryDate: new Date(2023, 11, 1),
  };

  const mockGetFuelQuote = jest.spyOn(quoteService, "getFuelQuote");

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should get a fuel quote - exists", async () => {
    mockGetFuelQuote.mockResolvedValue(fuelRequest);

    let result = await getUserFuelQuote(userId, fuelRequestId);

    expect(mockGetFuelQuote).toBeCalledWith(userId, fuelRequestId);
    expect(result).toEqual(fuelRequest);
  });

  it("should return null - does not exist", async () => {
    mockGetFuelQuote.mockResolvedValue();

    let result = await getUserFuelQuote(userId, fuelRequestId);

    expect(mockGetFuelQuote).toBeCalledWith(userId, fuelRequestId);
    expect(result).toBeNull();
  });

  it("should throw error - something wrong with database", async () => {
    mockGetFuelQuote.mockRejectedValue(Error("An error has occurred"));

    try {
      await getUserFuelQuote(userId, fuelRequestId);

      fail("should have thrown error");
    } catch (error) {
      expect(error.message).toEqual("An error has occurred");
      expect(mockGetFuelQuote).toBeCalledWith(userId, fuelRequestId);
    }
  });
});

describe("tests getting user's quote history", () => {
  const userId = 1;
  const requests = [
    {
      requestId: 20,
      userId: userId,
      amount: 10,
      unitPrice: 10,
      totalPrice: 100.0,
      deliveryAddress: "123 Street",
      deliveryDate: new Date(2023, 11, 1),
    },
    {
      requestId: 21,
      userId: userId,
      amount: 50,
      unitPrice: 4,
      totalPrice: 200.0,
      deliveryAddress: "456 Road",
      deliveryDate: new Date(2023, 11, 20),
    },
  ];

  const mockGetQuoteHistory = jest.spyOn(quoteService, "getQuoteHistory");

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should get user's quote history", async () => {
    mockGetQuoteHistory.mockResolvedValue(requests);

    let result = await getUserQuoteHistory(userId);

    expect(mockGetQuoteHistory).toBeCalledWith(userId);
    expect(result).toEqual(requests);
    expect(Array.isArray(result)).toBe(true);
  });

  it("should throw error - no quotes found", async () => {
    mockGetQuoteHistory.mockResolvedValue([]);

    try {
      await getUserQuoteHistory(userId);
      fail("should throw error");
    } catch (error) {
      expect(error.message).toEqual("No Quotes Found");
      expect(mockGetQuoteHistory).toBeCalledWith(userId);
    }
  });
});
