import { getUserState, getUserStatus } from "../pricingService";

import * as db from "../../db";

const mockExecuteQuery = jest.spyOn(db, "executeQuery");

describe("tests client data related to pricing", () => {
  const userId = 1;
  const userState = "TX";
  const userCustomerStatus = false;

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should return user's state", async () => {
    mockExecuteQuery.mockResolvedValue({
      rows: [
        {
          state: userState,
        },
      ],
      command: "",
      rowCount: 1,
      oid: 1,
      fields: [],
    });

    let result = await getUserState(userId);

    expect(mockExecuteQuery).toBeCalledWith(
      expect.objectContaining({
        values: [userId],
      })
    );
    expect(result).toEqual(userState);
  });

  it("should return user's customer status", async () => {
    mockExecuteQuery.mockResolvedValue({
      rows: [
        {
          returning_customer: userCustomerStatus,
        },
      ],
      command: "",
      rowCount: 1,
      oid: 1,
      fields: [],
    });

    let result = await getUserStatus(userId);

    expect(mockExecuteQuery).toBeCalledWith(
      expect.objectContaining({
        values: [userId],
      })
    );
    expect(result).toBe(userCustomerStatus);
  });
});
