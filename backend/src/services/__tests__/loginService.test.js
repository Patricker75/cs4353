import { addLogin, getLogin } from "../loginService";

import * as db from "../../db";

const mockExecuteQuery = jest.spyOn(db, "executeQuery");

describe("tests adding a new login", () => {
  const loginId = 1;

  const email = "user@mail.com";
  const hashedPassword = "superhash";

  it("should create a new login - unique email", async () => {
    mockExecuteQuery.mockResolvedValue({
      rows: [
        {
          id: loginId,
        },
      ],
      command: "",
      rowCount: 1,
      oid: 1,
      fields: [],
    });

    let result = await addLogin(email, hashedPassword);

    expect(mockExecuteQuery).toBeCalledWith(
      expect.objectContaining({
        values: [email, hashedPassword],
      })
    );
    expect(result).toEqual(loginId);
    expect(typeof result).toEqual("number");
  });
});

describe("tests getting a login", () => {
  const loginId = 1;

  const email = "user@mail.com";
  const hashedPassword = "superhash";
  const badPassword = "badpassword";

  it("should get an id - valid login", async () => {
    mockExecuteQuery.mockResolvedValue({
      rows: [
        {
          id: loginId,
        },
      ],
      command: "",
      rowCount: 1,
      oid: 1,
      fields: [],
    });

    let result = await getLogin(email, hashedPassword);

    expect(mockExecuteQuery).toBeCalledWith(
      expect.objectContaining({
        values: [email, hashedPassword],
      })
    );
    expect(result).toEqual(loginId);
    expect(typeof result).toEqual("number");
  });

  it("should get an null - invalid login", async () => {
    mockExecuteQuery.mockResolvedValue({
      rows: [],
      command: "",
      rowCount: 1,
      oid: 1,
      fields: [],
    });

    let result = await getLogin(email, badPassword);

    expect(mockExecuteQuery).toBeCalledWith(
      expect.objectContaining({
        values: [email, badPassword],
      })
    );
    expect(result).toBeNull();
  });
});
