import { handleGetPrice } from "../pricingHandler";

import * as pricingService from "../../services/pricingService";

describe("tests getting a pricing for a quote", () => {
  const userId = 1;
  const amount = 1001;
  const unitPrice = 1.695;
  const total = 1696.7;

  let mockRequest = {};
  let mockResponse = {};

  const mockGetUserState = jest.spyOn(pricingService, "getUserState");
  const mockGetUserStatus = jest.spyOn(pricingService, "getUserStatus");

  beforeEach(() => {
    jest.resetAllMocks();

    mockRequest.get = (key) => {
      if (key === "userId") return userId;
    };
    mockRequest.params = {
      amount,
    };

    mockResponse.status = jest.fn();
    mockResponse.send = jest.fn();
  });

  it("should return a price - valid quote", async () => {
    mockGetUserState.mockResolvedValue("TX");
    mockGetUserStatus.mockResolvedValue(true);

    await handleGetPrice(mockRequest, mockResponse);

    expect(mockResponse.status).toBeCalledWith(200);
    expect(mockResponse.send).toBeCalledWith(
      expect.objectContaining({
        message: "OK",
        unitPrice,
        total,
      })
    );
  });

  it("should throw error - missing userId", async () => {
    mockRequest.get = () => {};

    await handleGetPrice(mockRequest, mockResponse);

    expect(mockResponse.status).toBeCalledWith(404);
    expect(mockResponse.send).toBeCalledWith(
      expect.objectContaining({
        error: "Missing userId",
      })
    );
  });

  it("should throw error - missing amount", async () => {
    mockRequest.params = {};

    await handleGetPrice(mockRequest, mockResponse);

    expect(mockResponse.status).toBeCalledWith(400);
    expect(mockResponse.send).toBeCalledWith(
      expect.objectContaining({
        error: "Missing amount",
      })
    );
  });

  it("should throw error - invalid amount", async () => {
    mockRequest.params = {
      amount: amount.toString(),
    };

    await handleGetPrice(mockRequest, mockResponse);

    expect(mockResponse.status).toBeCalledWith(400);
    expect(mockResponse.send).toBeCalledWith(
      expect.objectContaining({
        error: "Invalid Amount",
      })
    );
  });
});
