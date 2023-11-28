import {
  handleAddQuote,
  handleGetFuelQuote,
  handleGetQuoteHistory,
} from "../quotesHandler";

import * as quotesController from "../../controllers/quotesController";

describe("tests creating a new fuel quote", () => {
  const userId = 1;
  const requestId = 20;
  let requestData = {};

  let mockRequest = {};
  let mockResponse = {};

  const mockCreateNewFuelQuote = jest.spyOn(
    quotesController,
    "createNewFuelQuote"
  );

  beforeEach(() => {
    jest.resetAllMocks();

    requestData = {
      amount: 10,
      unitPrice: 10,
      totalPrice: 100.0,
      deliveryAddress: "123 Street",
      deliveryDate: new Date(2023, 11, 1),
    };

    mockRequest.get = (key) => {
      if (key === "userId") return userId;
    };
    mockResponse.status = jest.fn();
    mockResponse.send = jest.fn();
  });

  it("should create a new fuel quote - valid quote", async () => {
    mockCreateNewFuelQuote.mockResolvedValue(requestId);

    mockRequest.body = {
      ...requestData,
    };

    await handleAddQuote(mockRequest, mockResponse);

    expect(mockCreateNewFuelQuote).toBeCalledWith(userId, requestData);
    expect(mockResponse.status).toBeCalledWith(200);
    expect(mockResponse.send).toBeCalledWith(
      expect.objectContaining({
        message: "OK",
        requestId,
      })
    );
  });

  it("should throw error - missing userId", async () => {
    mockRequest.get = () => {};

    await handleAddQuote(mockRequest, mockResponse);

    expect(mockCreateNewFuelQuote).not.toBeCalled();
    expect(mockResponse.status).toBeCalledWith(404);
    expect(mockResponse.send).toBeCalledWith(
      expect.objectContaining({
        error: "Missing userId",
      })
    );
  });

  it("should throw error - invalid request data", async () => {
    mockCreateNewFuelQuote.mockRejectedValue(Error("Invalid Quote"));

    await handleAddQuote(mockRequest, mockResponse);

    expect(mockCreateNewFuelQuote).toBeCalledWith(userId, requestData);
    expect(mockResponse.status).toBeCalledWith(400);
    expect(mockResponse.send).toBeCalledWith(
      expect.objectContaining({
        error: "Invalid Quote",
      })
    );
  });
});

describe("tests getting a user's fuel quote", () => {
  const userId = 1;
  const requestId = 20;
  const fuelQuote = {
    userId,
    requestId,
    amount: 10,
    unitPrice: 10,
    totalPrice: 100.0,
    deliveryAddress: "123 Street",
    deliveryDate: new Date(2023, 11, 1),
  };

  let mockRequest = {};
  let mockResponse = {};

  const mockGetUserFuelQuote = jest.spyOn(quotesController, "getUserFuelQuote");

  beforeEach(() => {
    jest.resetAllMocks();

    mockRequest.get = (key) => {
      if (key === "userId") return userId;
    };
    mockRequest.params = {
      requestId,
    };
    mockResponse.status = jest.fn();
    mockResponse.send = jest.fn();
  });

  it("should get a user's fuel quote - valid", async () => {
    mockGetUserFuelQuote.mockResolvedValue(fuelQuote);

    await handleGetFuelQuote(mockRequest, mockResponse);

    expect(mockResponse.status).toBeCalledWith(200);
    expect(mockResponse.send).toBeCalledWith(
      expect.objectContaining({
        message: "OK",
        quote: fuelQuote,
      })
    );
  });

  it("should throw error - missing userId", async () => {
    mockRequest.get = () => {};

    await handleGetFuelQuote(mockRequest, mockResponse);

    expect(mockGetUserFuelQuote).not.toBeCalled();
    expect(mockResponse.status).toBeCalledWith(404);
    expect(mockResponse.send).toBeCalledWith(
      expect.objectContaining({
        error: "Missing userId",
      })
    );
  });

  it("should throw error - missing requestId", async () => {
    mockRequest.params = {};

    await handleGetFuelQuote(mockRequest, mockResponse);

    expect(mockGetUserFuelQuote).not.toBeCalled();
    expect(mockResponse.status).toBeCalledWith(400);
    expect(mockResponse.send).toBeCalledWith(
      expect.objectContaining({
        error: "Missing requestId",
      })
    );
  });

  it("should throw error - invalid requestId", async () => {
    mockGetUserFuelQuote.mockResolvedValue(null);

    await handleGetFuelQuote(mockRequest, mockResponse);

    expect(mockGetUserFuelQuote).toBeCalledWith(userId, requestId);
    expect(mockResponse.status).toBeCalledWith(400);
    expect(mockResponse.send).toBeCalledWith(
      expect.objectContaining({
        error: "No Fuel Quote Found",
      })
    );
  });
});

describe("tests getting a user's quote history", () => {
  const userId = 1;
  const quotes = [
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

  let mockRequest = {};
  let mockResponse = {};

  const mockGetUserQuoteHistory = jest.spyOn(
    quotesController,
    "getUserQuoteHistory"
  );

  beforeEach(() => {
    jest.resetAllMocks();

    mockRequest.get = (key) => {
      if (key === "userId") return userId;
    };
    mockResponse.status = jest.fn();
    mockResponse.send = jest.fn();
  });

  it("should get a user's quote history", async () => {
    mockGetUserQuoteHistory.mockResolvedValue(quotes);

    await handleGetQuoteHistory(mockRequest, mockResponse);

    expect(mockResponse.status).toBeCalledWith(200);
    expect(mockResponse.send).toBeCalledWith(
      expect.objectContaining({
        message: "OK",
        quotes: quotes,
      })
    );
  });

  it("should throw error - missing userId", async () => {
    mockRequest.get = () => {};

    await handleGetQuoteHistory(mockRequest, mockResponse);

    expect(mockGetUserQuoteHistory).not.toBeCalled();
    expect(mockResponse.status).toBeCalledWith(404);
    expect(mockResponse.send).toBeCalledWith(
      expect.objectContaining({
        error: "Missing userId",
      })
    );
  });

  it("should throw error - no quotes found", async () => {
    mockGetUserQuoteHistory.mockRejectedValue(Error("No Quotes Found"));

    await handleGetQuoteHistory(mockRequest, mockResponse);

    expect(mockGetUserQuoteHistory).toBeCalledWith(userId);
    expect(mockResponse.status).toBeCalledWith(400);
    expect(mockResponse.send).toBeCalledWith(
      expect.objectContaining({
        error: "No Quotes Found",
      })
    );
  });
});
