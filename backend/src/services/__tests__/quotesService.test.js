import {
  addFuelQuote,
  getFuelQuote,
  getQuoteHistory,
  updateUserStatus,
} from "../quotesServices";

import * as db from "../../db";

const mockExecuteQuery = jest.spyOn(db, "executeQuery");

describe("tests creating a new fuel quote", () => {
  const userId = 1;
  const requestData = {
    amount: 10,
    unitPrice: 10,
    totalPrice: 100.0,
    deliveryDate: new Date(2023, 11, 1),
  };
  const fuelRequestId = 10;

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should create a new fuel quote", async () => {
    mockExecuteQuery.mockResolvedValue({
      rows: [
        {
          request_id: fuelRequestId,
        },
      ],
      command: "",
      rowCount: 1,
      oid: 1,
      fields: [],
    });

    let result = await addFuelQuote(userId, requestData);

    expect(mockExecuteQuery).toBeCalledWith(
      expect.objectContaining({
        values: [
          userId,
          requestData.amount,
          requestData.deliveryDate,
          requestData.unitPrice,
          requestData.totalPrice,
        ],
      })
    );
    expect(result).toEqual(fuelRequestId);
    expect(typeof result).toEqual("number");
  });
});

describe("tests getting a single fuel quote", () => {
  const userId = 1;
  const fuelRequestId = 10;

  const request = {
    requestId: fuelRequestId,
    userId: userId,
    amount: 10,
    unitPrice: 10,
    totalPrice: 100.0,
    deliveryDate: new Date(2023, 11, 1),
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should get a fuel quote", async () => {
    mockExecuteQuery.mockResolvedValue({
      rows: [
        {
          request_id: fuelRequestId,
          user_id: request.userId,
          amount: request.amount,
          unit_price: request.unitPrice,
          total_price: request.totalPrice,
          delivery_date: request.deliveryDate,
        },
      ],
      command: "",
      rowCount: 1,
      oid: 1,
      fields: [],
    });

    let result = await getFuelQuote(userId, fuelRequestId);

    expect(mockExecuteQuery).toBeCalledWith(
      expect.objectContaining({
        values: [userId, fuelRequestId],
      })
    );
    expect(result).toEqual(request);
  });
});

describe("tests getting fuel quote history", () => {
  const userId = 1;
  const requests = [
    {
      requestId: 20,
      userId: userId,
      amount: 10,
      unitPrice: 10,
      totalPrice: 100.0,
      deliveryDate: new Date(2023, 11, 1),
    },
    {
      requestId: 21,
      userId: userId,
      amount: 50,
      unitPrice: 4,
      totalPrice: 200.0,
      deliveryDate: new Date(2023, 11, 20),
    },
  ];

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should get user's quote history", async () => {
    mockExecuteQuery.mockResolvedValue({
      rows: requests.map((request) => {
        return {
          request_id: request.requestId,
          user_id: request.userId,
          amount: request.amount,
          unit_price: request.unitPrice,
          total_price: request.totalPrice,
          delivery_date: request.deliveryDate,
        };
      }),
      command: "",
      rowCount: 2,
      oid: 1,
      fields: [],
    });

    let result = await getQuoteHistory(userId);

    expect(mockExecuteQuery).toBeCalledWith(
      expect.objectContaining({
        values: [userId],
      })
    );
    expect(result).toEqual(requests);
    expect(Array.isArray(result)).toBe(true);
  });
});

describe("tests updating customer status on purchase", () => {
  const userId = 1;

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should update a user's status to true", async () => {
    mockExecuteQuery.mockResolvedValue();

    await updateUserStatus(userId);

    expect(mockExecuteQuery).toBeCalledWith(
      expect.objectContaining({
        values: [userId],
      })
    );
  });
});
